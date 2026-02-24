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
import { registerSchema, RegisterSchema } from '@/schemas'

const RegisterForm = () => {
	const {
		handleSubmit,
		control,
		formState: { errors, isSubmitting },
	} = useForm<RegisterSchema>({
		resolver: zodResolver(registerSchema),
		defaultValues: { name: '', email: '', password: '' },
	})

	const onSubmit = (values: RegisterSchema) => {
		console.log('Register Values:', values)
		// Gọi API đăng ký tại đây
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='space-y-4'>
			<FieldGroup>
				<Field>
					<FieldLabel>Name</FieldLabel>

					<Controller
						control={control}
						name='name'
						render={({ field }) => (
							<Input
								placeholder='John Doe'
								{...field}
							/>
						)}
					/>
				</Field>

				{errors.name && <FieldError>{errors.name.message}</FieldError>}
			</FieldGroup>

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
				Register
			</Button>
		</form>
	)
}

export default RegisterForm
