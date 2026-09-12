let file = {
    name: 'blah',
    description: 'yes',
    version: '0.0.1',
    manifest_version: 3,
    permissions: [
        'storage',
        'tabs'
    ],
    hosts_permissions: ["https://*.youtube.com/*"],
    background: {
        service_worker: 'background.js'
    },
    content_scripts: [
        {
            matches: ['*.youtube.someUrlOrAllOfThem', 'site2', 'site3'],
            js: ['folderName/content.js', 'folderName2/fileName2.js']
        }
    ]
}