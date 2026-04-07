import shutil, os

base = '/home/azo/Documents/mtayel_proj/mathayil-alotaibi-portfolio/mta/app/MTA_PRO'
pub = '/home/azo/Documents/mtayel_proj/mathayil-alotaibi-portfolio/mta/app/public/certificates'

# Ensure target dirs exist
os.makedirs(pub + '/datacamp', exist_ok=True)
os.makedirs(pub + '/community', exist_ok=True)
os.makedirs(pub + '/licenses', exist_ok=True)
os.makedirs(pub + '/other', exist_ok=True)

# Copy DataCamp certs
dc = os.path.join(base, 'شهايد الموقع', 'الشهادات التقنيه', 'cor datacamp')
for f in os.listdir(dc):
    src = os.path.join(dc, f)
    # Clean filename
    clean = f.replace(' ', '_').replace('(', '').replace(')', '')
    shutil.copy2(src, os.path.join(pub, 'datacamp', clean))
    print(f'Copied: datacamp/{clean}')

# Copy community certs
comm = os.path.join(base, 'شهايد الموقع', 'الشهادات المجتمعيه')
mapping = {
    'WhatsApp Image 2026-04-06 at 7.22.15 AM.jpeg': 'agentx_hackathon.jpeg',
    'WhatsApp Image 2026-04-06 at 7.23.37 AM.jpeg': 'champion_of_week.jpeg',
}
for f in os.listdir(comm):
    src = os.path.join(comm, f)
    if os.path.isfile(src):
        clean = mapping.get(f, f.replace(' ', '_').replace('(', '').replace(')', ''))
        shutil.copy2(src, os.path.join(pub, 'community', clean))
        print(f'Copied: community/{clean}')

# Copy licenses
lic = os.path.join(base, 'شهايد الموقع', 'التراخيص')
for f in os.listdir(lic):
    src = os.path.join(lic, f)
    clean = f.replace(' ', '_')
    shutil.copy2(src, os.path.join(pub, 'licenses', clean))
    print(f'Copied: licenses/{clean}')

# Copy other certs
oth = os.path.join(base, 'شهايد الموقع', 'الشهادات الاخرى')
for f in os.listdir(oth):
    src = os.path.join(oth, f)
    clean = f.replace(' ', '_').replace('(', '').replace(')', '')
    shutil.copy2(src, os.path.join(pub, 'other', clean))
    print(f'Copied: other/{clean}')

# Copy tech certs that are not already there (the security principles one)
tech = os.path.join(base, 'شهايد الموقع', 'الشهادات التقنيه')
for f in os.listdir(tech):
    src = os.path.join(tech, f)
    if os.path.isfile(src):
        clean = f.replace(' ', '_').replace('(', '').replace(')', '')
        dst = os.path.join(pub, clean)
        if not os.path.exists(dst):
            shutil.copy2(src, dst)
            print(f'Copied: {clean}')

print('\nDONE - All certificates copied')
