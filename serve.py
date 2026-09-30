#!/usr/bin/env python3
"""Dev server for Vibe Alchemist. Usage: python3 serve.py [port]"""
import http.server
import os
import socket
import subprocess
import sys

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8080


def get_ip_addresses():
    ips = []
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))  # no packet is sent; selects the outbound interface
        primary = s.getsockname()[0]
        s.close()
        if primary and not primary.startswith("127."):
            ips.append(primary)
    except Exception:
        pass
    try:
        for ip in subprocess.check_output(["hostname", "-I"], text=True).split():
            if ip not in ips and not ip.startswith("127.") and ":" not in ip:
                ips.append(ip)
    except Exception:
        pass
    return ips or ["127.0.0.1"]


class Handler(http.server.SimpleHTTPRequestHandler):
    extensions_map = {
        **http.server.SimpleHTTPRequestHandler.extensions_map,
        ".js": "text/javascript",
        ".json": "application/manifest+json",
    }

    def end_headers(self):
        self.send_header("Cache-Control", "no-cache")
        super().end_headers()

    def log_message(self, fmt, *args):
        pass


def main():
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    ips = get_ip_addresses()
    url = f"http://{ips[0]}:{PORT}"

    print("\nVibe Alchemist dev server")
    print(f"  Same Wi-Fi:  {url}")
    for ip in ips[1:]:
        print(f"               http://{ip}:{PORT}")
    print()
    print("Install / offline mode needs a secure context. Plain http://<LAN-IP> is NOT one,")
    print("so the service worker and the Install button are disabled there. Options:")
    print(f"  1) USB debugging:  adb reverse tcp:{PORT} tcp:{PORT}  then open http://localhost:{PORT} on the phone")
    print("  2) Host the folder on any HTTPS static host (GitHub Pages, Netlify, etc.)")
    print("  3) chrome://flags/#unsafely-treat-insecure-origin-as-secure -> add the URL above (dev only)")

    try:
        subprocess.run(["qrencode", "-t", "ANSIUTF8", url], check=True)
    except Exception:
        print(f"\n(qrencode not installed; type {url} into the phone browser)")

    print("\nCtrl+C to stop.\n")
    # Threaded: Chrome opens idle preconnect sockets that would block a single-threaded server.
    server = http.server.ThreadingHTTPServer(("0.0.0.0", PORT), Handler)
    server.daemon_threads = True
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopped.")


if __name__ == "__main__":
    main()
