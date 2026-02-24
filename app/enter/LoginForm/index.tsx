import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { loginSchema, LoginSchema } from '@/schemas'

const LoginForm = () => {
	const {
		handleSubmit,
		control,
		formState: { errors, isSubmitting },
	} = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema),
		defaultValues: { email: '', password: '' },
	})

	const onSubmit = (values: LoginSchema) => {
		console.log('Login Values:', values)
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='space-y-4'>
			<FieldGroup>
				<Field>
					<FieldLabel>Email</FieldLabel>

					<Controller
						control={control}
						name='email'
						render={({ field }) => (
							<Input
								placeholder='name@example.com'
								{...field}
							/>
						)}
					/>
				</Field>

				{errors.email && (
					<FieldError>{errors.email.message}</FieldError>
				)}
			</FieldGroup>

			<Field>
				<FieldLabel>Password</FieldLabel>

				<Controller
					control={control}
					name='password'
					render={({ field }) => (
						<Input
							type='password'
							placeholder='••••••••'
							{...field}
						/>
					)}
				/>

				{errors.password && (
					<FieldError>{errors.password.message}</FieldError>
				)}
			</Field>

			<Button
				disabled={isSubmitting}
				type='submit'
				className='w-full mt-2'>
				Login
			</Button>
		</form>
	)
}

export default LoginForm
