from PIL import Image, ImageDraw
import math

def create_icon(size, rounded=True):
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Outer squircle / rounded rect background
    r = size // 5
    # Gradient or soft rounded bg
    # Draw pastel peach / lavender background
    if rounded:
        draw.rounded_rectangle([0, 0, size, size], radius=r, fill=(255, 238, 230, 255))
    else:
        draw.rectangle([0, 0, size, size], fill=(255, 238, 230, 255))
    
    # Draw soft inner circle gradient glow
    cx, cy = size // 2, size // 2
    blob_radius = int(size * 0.35)
    
    # Draw cute blob body (warm coral/rose)
    body_color = (255, 126, 139, 255)
    draw.ellipse([cx - blob_radius, cy - blob_radius + int(size*0.05),
                  cx + blob_radius, cy + blob_radius + int(size*0.05)], fill=body_color)
    
    # Little cute ears/buds
    ear_r = int(blob_radius * 0.3)
    draw.ellipse([cx - int(blob_radius*0.7), cy - blob_radius - int(ear_r*0.2),
                  cx - int(blob_radius*0.7) + ear_r*2, cy - blob_radius + ear_r*2], fill=body_color)
    draw.ellipse([cx + int(blob_radius*0.7) - ear_r*2, cy - blob_radius - int(ear_r*0.2),
                  cx + int(blob_radius*0.7), cy - blob_radius + ear_r*2], fill=body_color)

    # Eyes (big sparkling cartoon eyes)
    eye_offset_x = int(blob_radius * 0.38)
    eye_y = cy + int(size * 0.02)
    eye_r = int(size * 0.045)
    
    for ex in [cx - eye_offset_x, cx + eye_offset_x]:
        draw.ellipse([ex - eye_r, eye_y - eye_r, ex + eye_r, eye_y + eye_r], fill=(40, 30, 45, 255))
        # Eye glint
        glint_r = max(2, int(eye_r * 0.45))
        draw.ellipse([ex - glint_r + 1, eye_y - eye_r + 2, ex + 2, eye_y - eye_r + 2 + glint_r*2], fill=(255, 255, 255, 255))

    # Cute rosy cheeks
    blush_r = int(size * 0.05)
    blush_y = eye_y + int(size * 0.04)
    blush_color = (255, 180, 190, 220)
    draw.ellipse([cx - eye_offset_x - int(size*0.04) - blush_r, blush_y - blush_r,
                  cx - eye_offset_x - int(size*0.04) + blush_r, blush_y + blush_r], fill=blush_color)
    draw.ellipse([cx + eye_offset_x + int(size*0.04) - blush_r, blush_y - blush_r,
                  cx + eye_offset_x + int(size*0.04) + blush_r, blush_y + blush_r], fill=blush_color)

    # Smile
    mouth_y = eye_y + int(size * 0.035)
    draw.arc([cx - int(size*0.04), mouth_y, cx + int(size*0.04), mouth_y + int(size*0.04)],
             start=20, end=160, fill=(40, 30, 45, 255), width=max(2, int(size*0.015)))

    # Sparkle star on top right
    def draw_star(sx, sy, s_size, color):
        points = []
        for i in range(8):
            angle = i * math.pi / 4
            d = s_size if i % 2 == 0 else s_size * 0.35
            points.append((sx + d * math.cos(angle), sy + d * math.sin(angle)))
        draw.polygon(points, fill=color)

    draw_star(cx + int(blob_radius * 0.8), cy - int(blob_radius * 0.8), int(size * 0.09), (255, 215, 0, 255))
    draw_star(cx - int(blob_radius * 0.75), cy - int(blob_radius * 0.5), int(size * 0.05), (255, 190, 80, 240))
    
    return img

icon_192 = create_icon(192)
icon_192.save('icons/icon-192.png')

icon_512 = create_icon(512)
icon_512.save('icons/icon-512.png')

# Maskable icon: full-bleed opaque background, artwork inside the central safe zone
def create_maskable(size):
    bg = Image.new('RGBA', (size, size), (255, 238, 230, 255))
    fg_size = int(size * 0.72)
    fg = create_icon(fg_size, rounded=False)
    off = (size - fg_size) // 2
    bg.paste(fg, (off, off))
    return bg

create_maskable(512).save('icons/icon-maskable.png')
print("Generated icons successfully!")
