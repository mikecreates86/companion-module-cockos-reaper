import { Regex, SomeCompanionConfigField } from '@companion-module/base'

export interface ModuleConfig {
	host: string
	port: number
	feedbackPort: number
	refreshOnInit: boolean
	numberOfTracks: number
	numberOfFx: number
	webPort?: number
	saveScriptId?: string
	saveFolder?: string
}

export function GetConfigFields(): SomeCompanionConfigField[] {
	return [
		{
			type: 'static-text',
			id: 'info',
			width: 12,
			label: 'Information',
			value: 'This module controls <a href="https://www.reaper.fm" target="_new">REAPER</a>.',
		},
		{
			type: 'textinput',
			id: 'host',
			width: 6,
			label: 'Target IP',
			tooltip: 'The IP of the computer running REAPER',
			regex: Regex.IP,
		},
		{
			type: 'number',
			id: 'port',
			label: 'Target Port',
			width: 3,
			tooltip: 'The port REAPER is listening to OSC on',
			min: 1,
			max: 65535,
			default: 8000,
		},
		{
			type: 'number',
			id: 'feedbackPort',
			label: 'Feedback Port',
			width: 3,
			tooltip: 'The port REAPER is sending OSC to',
			min: 1,
			max: 65535,
			default: 9000,
		},
		{
			type: 'checkbox',
			id: 'refreshOnInit',
			label: 'Refresh On Start',
			width: 3,
			tooltip: 'If enabled, a "Control surface: Refresh all surfaces" command will be sent to reaper on start.',
			default: true,
		},
		{
			type: 'number',
			id: 'numberOfTracks',
			label: 'Number of Tracks',
			width: 3,
			tooltip: 'Sets the number of tracks per bank',
			min: 1,
			max: 512,
			default: 8,
		},
		{
			type: 'number',
			id: 'numberOfFx',
			label: 'Number of FX',
			width: 3,
			tooltip: 'Sets the number of FX per track',
			min: 1,
			max: 512,
			default: 8,
		},
		{
			type: 'number',
			id: 'webPort',
			label: 'Web Interface Port',
			width: 3,
			tooltip:
				'Only needed for the "Save Project" action. The port of the REAPER web browser interface (Preferences > Control/OSC/web).',
			min: 1,
			max: 65535,
			default: 8080,
		},
		{
			type: 'textinput',
			id: 'saveScriptId',
			label: 'Save Script Command ID',
			width: 9,
			tooltip:
				'Only needed for the "Save Project" action. The command ID of companion_save_project.lua in the REAPER Actions list (e.g. _RS1234abcd...).',
		},
		{
			type: 'textinput',
			id: 'saveFolder',
			label: 'Save Folder',
			width: 12,
			tooltip:
				'Only needed for the "Save Project" action. Folder on the REAPER computer used the first time a project is saved. Leave blank to use REAPER\'s default recording path.',
		},
	]
}
