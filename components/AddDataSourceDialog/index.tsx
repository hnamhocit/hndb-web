import { DataSourceFormData, dataSourceSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { PlugIcon } from 'lucide-react'
import {
	Controller,
	FieldErrors,
	SubmitHandler,
	useForm,
	useWatch,
} from 'react-hook-form'

import { supportDataSources } from '@/constants/supportDataSources'
import { useDataSourcesStore } from '@/stores'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../ui/dialog'
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldSet,
} from '../ui/field'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select'

const AddDataSourceDialog = () => {
	const {
		handleSubmit,
		control,
		formState: { errors, isSubmitting },
		reset,
	} = useForm({
		resolver: zodResolver(dataSourceSchema),
		defaultValues: {
			type: 'postgresql',
			method: 'host',
			host: 'localhost',
			port: 5432,
			database: '',
			savePassword: true,
			showAllDatabases: true,
			username: '',
			password: '',
		},
	})
	const { datasources, setDatasources } = useDataSourcesStore()

	const method = useWatch({
		control: control,
		name: 'method',
	})

	const hostErrors = errors as FieldErrors<{
		host: string
		port: string
		database: string
	}>
	const urlErrors = errors as FieldErrors<{ url: string }>

	const onSubmit: SubmitHandler<DataSourceFormData> = (data) => {
		setDatasources([...datasources, data])
		reset()
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					size='icon'
					variant='outline'>
					<PlugIcon />
				</Button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add Data Source</DialogTitle>
				</DialogHeader>

				<form onSubmit={handleSubmit(onSubmit)}>
					<FieldSet>
						<div className='text-indigo-500 font-semibold font-mono'>
							Server
						</div>

						<FieldGroup>
							<Field orientation='horizontal'>
								<FieldLabel>Data Source Type</FieldLabel>

								<Controller
									control={control}
									name='type'
									render={({
										field: { value, onChange },
									}) => (
										<Select
											value={value}
											onValueChange={onChange}>
											<SelectTrigger>
												<SelectValue placeholder='Select a data source' />
											</SelectTrigger>
											<SelectContent>
												{supportDataSources.map(
													(ds) => (
														<SelectItem
															key={ds.id}
															value={ds.id}>
															{ds.name}
														</SelectItem>
													),
												)}
											</SelectContent>
										</Select>
									)}
								/>
							</Field>

							<Field orientation='horizontal'>
								<FieldLabel>Connected by</FieldLabel>

								<Controller
									control={control}
									name='method'
									render={({
										field: { value, onChange },
									}) => (
										<RadioGroup
											value={value}
											onValueChange={onChange}
											orientation='horizontal'>
											<div className='flex items-center gap-3'>
												<RadioGroupItem
													value='host'
													id='host'
												/>

												<Label htmlFor='host'>
													Host
												</Label>
											</div>

											<div className='flex items-center gap-3'>
												<RadioGroupItem
													value='url'
													id='url'
												/>

												<Label htmlFor='url'>URL</Label>
											</div>
										</RadioGroup>
									)}
								/>
							</Field>

							{method === 'url' && (
								<div className='space-y-2'>
									<Field orientation='horizontal'>
										<FieldLabel>URL</FieldLabel>

										<Controller
											control={control}
											name='url'
											render={({ field }) => (
												<Input
													{...field}
													type='text'
													placeholder='e.g. localhost:5432'
												/>
											)}
										/>
									</Field>

									{urlErrors.url && (
										<FieldError>
											{urlErrors.url?.message}
										</FieldError>
									)}
								</div>
							)}

							{method === 'host' && (
								<div className='space-y-2'>
									<Field orientation='horizontal'>
										<FieldLabel>Host</FieldLabel>

										<Controller
											control={control}
											name='host'
											render={({ field }) => (
												<Input
													{...field}
													type='text'
													placeholder='e.g. localhost'
												/>
											)}
										/>

										<FieldLabel>Port</FieldLabel>

										<Controller
											control={control}
											name='port'
											render={({ field }) => (
												<Input
													{...field}
													type='text'
													placeholder='e.g. 5432'
													className='max-w-24'
												/>
											)}
										/>
									</Field>

									{hostErrors.host && (
										<FieldError>
											{hostErrors.host?.message}
										</FieldError>
									)}

									{hostErrors.port && (
										<FieldError>
											{hostErrors.port?.message}
										</FieldError>
									)}
								</div>
							)}

							<div className='space-y-2'>
								<Field orientation='horizontal'>
									{method === 'host' && (
										<>
											<FieldLabel>Database</FieldLabel>

											<Controller
												control={control}
												name='database'
												render={({ field }) => (
													<Input
														{...field}
														type='text'
														placeholder='e.g. my_database'
													/>
												)}
											/>
										</>
									)}

									<Controller
										control={control}
										name='showAllDatabases'
										render={({ field }) => (
											<Checkbox
												id='show-all-databases'
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										)}
									/>

									<FieldLabel htmlFor='show-all-databases'>
										Show all databases
									</FieldLabel>
								</Field>

								{hostErrors?.database && (
									<FieldError>
										{hostErrors?.database?.message}
									</FieldError>
								)}
							</div>
						</FieldGroup>

						<div className='text-indigo-500 font-semibold font-mono'>
							Authentication
						</div>

						<FieldGroup>
							<div className='space-y-2'>
								<Field orientation='horizontal'>
									<FieldLabel>Username</FieldLabel>

									<Controller
										control={control}
										name='username'
										render={({ field }) => (
											<Input
												{...field}
												type='text'
												placeholder='e.g. admin'
											/>
										)}
									/>
								</Field>

								{errors.username && (
									<FieldError>
										{errors.username?.message}
									</FieldError>
								)}
							</div>

							<div className='space-y-2'>
								<Field orientation='horizontal'>
									<FieldLabel>Password</FieldLabel>

									<Controller
										control={control}
										name='password'
										render={({ field }) => (
											<Input
												{...field}
												type='password'
												placeholder='Enter your password'
											/>
										)}
									/>

									<Controller
										control={control}
										name='savePassword'
										render={({ field }) => (
											<Checkbox
												id='save-password'
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										)}
									/>

									<FieldLabel htmlFor='save-password'>
										Save password
									</FieldLabel>
								</Field>

								{errors.password && (
									<FieldError>
										{errors.password?.message}
									</FieldError>
								)}
							</div>
						</FieldGroup>

						<Button
							type='submit'
							disabled={isSubmitting}
							className='mt-4'>
							Connect
						</Button>
					</FieldSet>
				</form>
			</DialogContent>
		</Dialog>
	)
}

export default AddDataSourceDialog
