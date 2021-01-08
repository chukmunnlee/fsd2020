export const MSG_TYPE_GET_PLAYER_LOCATION = 'get-player-location'
export const MSG_TYPE_PLAYER_LOCATION = 'player-location'
export const MSG_TYPE_PLAYER_JOINED = 'player-joined'
export const MSG_TYPE_GET_ALL_PLAYER_LOCATIONS = 'get-all-player-locations'
export const MSG_TYPE_ALL_PLAYER_LOCATIONS = 'all-player-locations'
export const MSG_TYPE_REQUEST_MOVEMENT = 'request-movement'
export const MSG_TYPE_PLAYER_MOVED = 'player-moved'

export interface BaseMessage {
  type: string
}

export interface GetPlayerLocationMessage extends BaseMessage {
  player: number
}

export interface PlayerLocationMessage extends BaseMessage {
  player: number
  x: number
  y: number
}

export interface PlayerJoinedMessage extends PlayerLocationMessage { }

export interface GetAllPlayerLocationsMessage extends BaseMessage {
  player: number
}

export interface AllPlayerLocationsMessage extends BaseMessage {
  players: PlayerLocationMessage[]
}

export interface RequestMovementMessage extends BaseMessage {
  player: number
  direction: string
}

export interface PlayerMovedMessage extends BaseMessage {
  player: number
  from: { x: number; y: number },
  to: { x: number; y: number }
}
