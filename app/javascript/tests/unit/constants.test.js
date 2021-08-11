import { colours } from '../../constants'

test("check colours is the right length", () => {
	expect(colours.length).toBe(21)
})

test("check colours const has all colours in it", () => {
	expect(colours.filter(c => c.name.includes('red')).length).toBe(3)
	expect(colours.filter(c => c.name.includes('yellow')).length).toBe(3)
	expect(colours.filter(c => c.name.includes('green')).length).toBe(3)
	expect(colours.filter(c => c.name.includes('blue-')).length).toBe(3)
	expect(colours.filter(c => c.name.includes('purple')).length).toBe(3)
	expect(colours.filter(c => c.name.includes('coolGray')).length).toBe(2)
	expect(colours.filter(c => c.name.includes('blueGray')).length).toBe(3)
	expect(colours.filter(c => c.name.includes('white')).length).toBe(1)
})

test("check the red colours are the correct hex values", () => {
	expect(colours.filter(c => c.name === 'red-400')[0].hex).toBe('#FB7185')
	expect(colours.filter(c => c.name === 'red-600')[0].hex).toBe('#E11D48')
	expect(colours.filter(c => c.name === 'red-700')[0].hex).toBe('#BE123C')
})

test("check the yellow colours are the correct hex values", () => {
	expect(colours.filter(c => c.name === 'yellow-200')[0].hex).toBe('#FDE68A')
	expect(colours.filter(c => c.name === 'yellow-300')[0].hex).toBe('#FCD34D')
	expect(colours.filter(c => c.name === 'yellow-400')[0].hex).toBe('#FBBF24')
})

test("check the green colours are the correct hex values", () => {
	expect(colours.filter(c => c.name === 'green-400')[0].hex).toBe('#34D399')
	expect(colours.filter(c => c.name === 'green-500')[0].hex).toBe('#10B981')
	expect(colours.filter(c => c.name === 'green-600')[0].hex).toBe('#059669')
})

test("check the blue colours are the correct hex values", () => {
	expect(colours.filter(c => c.name === 'blue-400')[0].hex).toBe('#60A5FA')
	expect(colours.filter(c => c.name === 'blue-500')[0].hex).toBe('#3B82F6')
	expect(colours.filter(c => c.name === 'blue-600')[0].hex).toBe('#2563EB')
})

test("check the purple colours are the correct hex values", () => {
	expect(colours.filter(c => c.name === 'purple-400')[0].hex).toBe('#C084FC')
	expect(colours.filter(c => c.name === 'purple-500')[0].hex).toBe('#A855F7')
	expect(colours.filter(c => c.name === 'purple-600')[0].hex).toBe('#9333EA')
})

test("check the gray colours are the correct hex values", () => {
	expect(colours.filter(c => c.name === 'blueGray-400')[0].hex).toBe('#94A3B8')
	expect(colours.filter(c => c.name === 'blueGray-500')[0].hex).toBe('#64748B')
	expect(colours.filter(c => c.name === 'blueGray-600')[0].hex).toBe('#475569')
	expect(colours.filter(c => c.name === 'white')[0].hex).toBe('#FFFFFF')
	expect(colours.filter(c => c.name === 'coolGray-100')[0].hex).toBe('#F3F4F6')
	expect(colours.filter(c => c.name === 'coolGray-200')[0].hex).toBe('#E5E7EB')
})
