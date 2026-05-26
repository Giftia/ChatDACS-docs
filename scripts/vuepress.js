'use strict'

const path = require('path')
const {spawnSync} = require('child_process')

const vuepressBin = path.join(
  __dirname,
  '..',
  'node_modules',
  '.bin',
  process.platform === 'win32' ? 'vuepress.cmd' : 'vuepress',
)
const existingNodeOptions = process.env.NODE_OPTIONS ? `${process.env.NODE_OPTIONS} ` : ''

const result = spawnSync(vuepressBin, process.argv.slice(2), {
  stdio: 'inherit',
  shell: process.platform === 'win32',
  env: {
    ...process.env,
    NODE_OPTIONS: `${existingNodeOptions}--openssl-legacy-provider`,
  },
})

process.exit(result.status ?? 1)
