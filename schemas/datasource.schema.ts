import { z } from 'zod'

export const datasourceSchema = z.enum([
	'postgresql',
	'mysql',
	'sqlite',
	'mongodb',
	'redis',
])
export type DataSourceType = z.infer<typeof datasourceSchema>

export const ConnectionMethod = z.enum(['host', 'url'])
export type ConnectionMethod = z.infer<typeof ConnectionMethod>

const baseDataSourceSchema = z.object({
	type: datasourceSchema,
	savePassword: z.boolean().default(false),
	showAllDatabases: z.boolean().default(false),
	username: z.string().nonempty('Username is required'),
	password: z.string().nonempty('Password is required'),
})

const hostConnectionSchema = baseDataSourceSchema.extend({
	method: z.literal('host'),
	host: z.string().min(1, 'Host is required'),
	port: z.number().int().min(1).max(65535),
	database: z.string().min(1, 'Database is required'),
})

const urlConnectionSchema = baseDataSourceSchema.extend({
	method: z.literal('url'),
	url: z
		.string()
		.min(1, 'URL is required')
		.refine((val) => {
			const patterns = [
				/^postgres(ql)?:\/\//,
				/^mysql:\/\//,
				/^mongodb(\+srv)?:\/\//,
				/^redis:\/\//,
				/^sqlite:\/\//,
			]
			return patterns.some((p) => p.test(val))
		}, 'Invalid database URL format'),
})

export const dataSourceSchema = z.discriminatedUnion('method', [
	hostConnectionSchema,
	urlConnectionSchema,
])

export type DataSourceFormData = z.infer<typeof dataSourceSchema>

export type HostConnectionData = z.infer<typeof hostConnectionSchema>
export type UrlConnectionData = z.infer<typeof urlConnectionSchema>
