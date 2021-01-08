import { Injector } from '@angular/core'

export interface Character {
	name: string
	id: number
}

export const CHARACTERS: Character[] = [
	{ name: 'Knight', id: 0 },
	{ name: 'Amazon', id: 1 },
	{ name: 'Joker', id: 2 },
	{ name: 'Griffin', id: 3 },
]

export const ID_TO_IMG = [ 118, 120, 124 , 134 ]

export class Globals {
	static injector: Injector
}
