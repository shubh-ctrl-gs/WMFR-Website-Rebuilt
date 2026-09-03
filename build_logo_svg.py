import re

with open('cactus_path.txt', 'r', encoding='utf-8') as f:
    c_raw = f.read().strip()
with open('palm_tree_path.txt', 'r', encoding='utf-8') as f:
    p_raw = f.read().strip()

# Extract the path string
c_match = re.search(r'd="([^"]+)"', c_raw)
p_match = re.search(r'd="([^"]+)"', p_raw)

cactus_d = c_match.group(1) if c_match else c_raw
palm_d = p_match.group(1) if p_match else p_raw

print("Cactus d len:", len(cactus_d))
print("Palm d len:", len(palm_d))

svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 350" width="100%" height="100%" style="overflow: visible;">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@900&amp;display=swap');
      .logo-text {{
        font-family: 'Barlow Condensed', 'Arial Narrow', sans-serif;
        font-weight: 900;
      }}
    </style>
    <clipPath id="wmfrPillClip">
      <rect x="0" y="0" width="900" height="350" rx="175" ry="175" />
    </clipPath>
    <clipPath id="sunCutClip">
      <circle cx="185" cy="175" r="130" />
    </clipPath>
    <linearGradient id="sunGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#EB6024" />
      <stop offset="35%" stop-color="#F28532" />
      <stop offset="70%" stop-color="#F9AD4A" />
      <stop offset="100%" stop-color="#FDC87E" />
    </linearGradient>
  </defs>

  <!-- Background Pill -->
  <rect x="7" y="7" width="886" height="336" rx="168" ry="168" fill="#FFFFFF" />

  <!-- Inside Clipped Graphics -->
  <g clip-path="url(#wmfrPillClip)">
    <!-- Sun -->
    <g id="wmfrSun">
      <circle cx="185" cy="175" r="130" fill="url(#sunGrad)" />
      <!-- Horizontal laser cut stripes -->
      <g clip-path="url(#sunCutClip)">
        <rect x="10" y="115" width="360" height="5" fill="#FFFFFF" />
        <rect x="10" y="142" width="360" height="6" fill="#FFFFFF" />
        <rect x="10" y="170" width="360" height="7" fill="#FFFFFF" />
        <rect x="10" y="199" width="360" height="8" fill="#FFFFFF" />
        <rect x="10" y="229" width="360" height="9" fill="#FFFFFF" />
        <rect x="10" y="260" width="360" height="10" fill="#FFFFFF" />
      </g>
    </g>

    <!-- Saguaro Cactus Vector -->
    <g transform="translate(10, 0)" fill="#094483">
      <path d="{cactus_d}" />
    </g>

    <!-- California Palm Tree Vector -->
    <g transform="translate(10, 0)" fill="#094483">
      <path d="{palm_d}" />
    </g>
  </g>

  <!-- Logo Typography -->
  <g transform="translate(340, 0)" class="logo-text" font-weight="900" fill="#094483">
    <!-- WESTERN -->
    <g font-size="78" letter-spacing="6" text-anchor="start">
      <text x="0" y="133" fill="#9CA3AF">WESTERN</text>
      <text x="0" y="132" fill="#D1D5DB">WESTERN</text>
      <text x="0" y="130" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="4">WESTERN</text>
      <text x="0" y="130" fill="#094483" stroke="#FFFFFF" stroke-width="1.5" paint-order="stroke fill">WESTERN</text>
    </g>

    <!-- MULTI-FAMILY -->
    <g font-size="78" letter-spacing="1.5" text-anchor="start">
      <text x="0" y="208" fill="#9CA3AF">MULTI-FAMILY</text>
      <text x="0" y="207" fill="#D1D5DB">MULTI-FAMILY</text>
      <text x="0" y="205" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="4">MULTI-FAMILY</text>
      <text x="0" y="205" fill="#094483" stroke="#FFFFFF" stroke-width="1.5" paint-order="stroke fill">MULTI-FAMILY</text>
    </g>

    <!-- RENOVATION -->
    <g font-size="78" letter-spacing="3" text-anchor="start">
      <text x="0" y="283" fill="#9CA3AF">RENOVATION</text>
      <text x="0" y="282" fill="#D1D5DB">RENOVATION</text>
      <text x="0" y="280" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="4">RENOVATION</text>
      <text x="0" y="280" fill="#094483" stroke="#FFFFFF" stroke-width="1.5" paint-order="stroke fill">RENOVATION</text>
    </g>
  </g>

  <!-- Outer Pill Navy Border -->
  <rect x="7" y="7" width="886" height="336" rx="168" ry="168" fill="none" stroke="#094483" stroke-width="14" />
</svg>
'''

with open('assets/wmfr_logo.svg', 'w', encoding='utf-8') as out:
    out.write(svg_content)

print("Created assets/wmfr_logo.svg successfully!")
