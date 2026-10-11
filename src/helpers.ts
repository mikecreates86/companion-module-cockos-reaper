import http from 'http'
import { Reaper, Track, TrackFx } from 'reaper-osc'

export function GetTrack(reaper: Reaper, trackNumber: number): Track | undefined {
	return trackNumber === 0 ? reaper.master : reaper.tracks[trackNumber - 1]
}

export function GetTrackFx(reaper: Reaper, trackNumber: number, fxNumber: number): TrackFx | undefined {
	const track = GetTrack(reaper, trackNumber)

	if (track === undefined) {
		return undefined
	}

	return track.fx[fxNumber - 1]
}

/** Stores a value in REAPER's ExtState (section "Companion") through the REAPER web interface. */
export function SetReaperExtState(host: string, port: number, key: string, value: string): Promise<void> {
	return new Promise((resolve, reject) => {
		const path = `/_/SET/EXTSTATE/Companion/${encodeURIComponent(key)}/${encodeURIComponent(value)}`

		const req = http.get({ host, port, path, timeout: 3000 }, (res) => {
			res.resume()
			if (res.statusCode !== undefined && res.statusCode >= 400) {
				reject(new Error(`HTTP ${res.statusCode}`))
			} else {
				res.on('end', () => resolve())
			}
		})

		req.on('timeout', () => req.destroy(new Error('timed out')))
		req.on('error', reject)
	})
}
