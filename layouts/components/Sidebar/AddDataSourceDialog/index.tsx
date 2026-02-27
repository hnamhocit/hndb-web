'use client'

import { DataSourceFormData, dataSourceSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { PlugIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
	Controller,
	FieldErrors,
	SubmitHandler,
	useForm,
	useWatch,
} from 'react-hook-form'
import { toast } from 'sonner'

import { supportDataSources } from '@/constants/supportDataSources'
import { dataSourcesService } from '@/services'
import { useDataSourcesStore, useUserStore } from '@/stores'
import { Button } from '../../../../components/ui/button'
import { Checkbox } from '../../../../components/ui/checkbox'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../../../../components/ui/dialog'
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldSet,
} from '../../../../components/ui/field'
import { Input } from '../../../../components/ui/input'
import { Label } from '../../../../components/ui/label'
import {
	RadioGroup,
	RadioGroupItem,
} from '../../../../components/ui/radio-group'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../../../../components/ui/select'

const AddDataSourceDialog = () => {
	// 1. Quản lý trạng thái đóng/mở của Dialog
	const [isOpen, setIsOpen] = useState(false)

	const {
		handleSubmit,
		control,
		formState: { errors, isSubmitting },
		reset,
		setValue,
	} = useForm<DataSourceFormData>({
		resolver: zodResolver(dataSourceSchema),
		defaultValues: {
			type: 'postgresql',
			method: 'host',
			host: 'localhost',
			port: 5432,
			database_name: '',
			savePassword: true,
			showAllDatabases: true,
			username: 'postgres',
			password: '',
		},
	})

	const { datasources, setDatasources } = useDataSourcesStore()
	const { user } = useUserStore()

	const method = useWatch({ control, name: 'method' })
	const dbType = useWatch({ control, name: 'type' })

	const hostErrors = errors as FieldErrors<{
		host: string
		port: string
		database_name: string
	}>
	const urlErrors = errors as FieldErrors<{ url: string }>

	useEffect(() => {
		if (dbType === 'postgresql') {
			setValue('port', 5432)
			setValue('username', 'postgres')
		} else if (dbType === 'mysql') {
			setValue('port', 3306)
			setValue('username', 'root')
		} else if (dbType === 'sql-server') {
			setValue('port', 1433)
			setValue('username', 'sa')
		} else if (dbType === 'sqlite') {
			// SQLite không cần Port và Username
			setValue('port', undefined)
			setValue('username', undefined)
			setValue('method', 'host')
		}
	}, [dbType, setValue])

	const onSubmit: SubmitHandler<DataSourceFormData> = async (formData) => {
		try {
			const { data } = await dataSourcesService.addDataSource({
				...formData,
				userId: user!.id,
			})

			setDatasources([...datasources, data.data])
			reset()
			setIsOpen(false) // 4. Đóng Dialog ngay khi gọi API thành công
			toast.success('Data source added successfully!', {
				position: 'top-center',
			})

			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (error) {
			toast.error('Failed to add data source.', {
				position: 'top-center',
			})
		}
	}

	return (
		<Dialog
			open={isOpen}
			onOpenChange={setIsOpen}>
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
						{dbType !== 'sqlite' && (
							<div className='text-indigo-500 font-semibold font-mono'>
								Server
							</div>
						)}

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

							{/* Ẩn chọn Method nếu là SQLite */}
							{dbType !== 'sqlite' && (
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
													<Label htmlFor='url'>
														URL
													</Label>
												</div>
											</RadioGroup>
										)}
									/>
								</Field>
							)}

							{method === 'url' && dbType !== 'sqlite' && (
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
													placeholder='e.g. postgres://user:pass@localhost:5432/db'
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
									{/* Ẩn Host/Port đối với SQLite */}
									{dbType !== 'sqlite' && (
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
														value={
															field.value || ''
														}
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
														type='number' // 5. Chuyển sang number
														placeholder='e.g. 5432'
														className='max-w-24'
														value={
															field.value || ''
														}
														// 6. Ép kiểu an toàn từ Chuỗi sang Số
														onChange={(e) =>
															field.onChange(
																parseInt(
																	e.target
																		.value,
																	10,
																) || undefined,
															)
														}
													/>
												)}
											/>
										</Field>
									)}

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
											<FieldLabel>
												{dbType === 'sqlite' ?
													'File Path'
												:	'Database'}
											</FieldLabel>
											<Controller
												control={control}
												name='database_name'
												render={({ field }) => (
													<Input
														{...field}
														type='text'
														placeholder={
															(
																dbType ===
																'sqlite'
															) ?
																'e.g. ./data.sqlite'
															:	'e.g. my_database'
														}
														value={
															field.value || ''
														}
													/>
												)}
											/>
										</>
									)}

									{/* Ẩn nút Show all databases cho SQLite */}
									{dbType !== 'sqlite' && (
										<>
											<Controller
												control={control}
												name='showAllDatabases'
												render={({ field }) => (
													<Checkbox
														id='show-all-databases'
														checked={field.value}
														onCheckedChange={
															field.onChange
														}
													/>
												)}
											/>
											<FieldLabel htmlFor='show-all-databases'>
												Show all databases
											</FieldLabel>
										</>
									)}
								</Field>

								{hostErrors?.database_name && (
									<FieldError>
										{hostErrors?.database_name?.message}
									</FieldError>
								)}
							</div>
						</FieldGroup>

						{/* 7. Ẩn toàn bộ khu vực Authentication nếu là SQLite */}
						{dbType !== 'sqlite' && (
							<>
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
														value={
															field.value || ''
														}
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
														value={
															field.value || ''
														}
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
														onCheckedChange={
															field.onChange
														}
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
							</>
						)}

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
