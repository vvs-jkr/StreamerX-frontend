import { type JwtPayload, jwtDecode } from 'jwt-decode'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { v4 as uuid4 } from 'uuid'

import { useGenerateStreamTokenMutation } from '@/graphql/generated/output'

import { useCurrent } from './useCurrent'
import { useAuth } from './useAuth'

export function useStreamToken(channelId: string) {
	const [token, setToken] = useState('')
	const [name, setName] = useState('')
	const [identity, setIdentity] = useState('')

	const { isAuthenticated } = useAuth()
	const { user } = useCurrent()

	const [generateStreamToken] = useGenerateStreamTokenMutation({
		onCompleted(data) {
			const viewerToken = data.generateStreamToken.token

			setToken(viewerToken)

			const decodedToken = jwtDecode(viewerToken) as JwtPayload & {
				name?: string
			}

			const name = decodedToken.name
			const identity = decodedToken.jti

			if (name) {
				setName(name)
			}

			if (identity) {
				setIdentity(identity)
			}
		},
		onError(error) {
			toast.error(error.message)
		}
	})

	useEffect(() => {
		async function generateToken() {
			const userId = isAuthenticated && user ? user.id : uuid4()

			await generateStreamToken({
				variables: {
					data: {
						userId,
						channelId
					}
				}
			})
		}

		const timeoutId = setTimeout(generateToken, 1000)

		return () => clearTimeout(timeoutId)
	}, [generateStreamToken, isAuthenticated, user, channelId])

	return { token, name, identity }
}
