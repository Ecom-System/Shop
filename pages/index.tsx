import { Button, TextInput } from '@mantine/core'
import React from 'react'
import { useState } from 'react'
import { HeroBullets } from 'src/components/home/hero'

const Home = () => {
	const [name, setName] = useState("")
	return (
		<>
			<HeroBullets />
		</>
	)
}

export default Home