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
        service_worker: "background.js"
    }
}