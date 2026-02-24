import type { LucideIcon } from 'lucide-react'
import {
	Binary,
	Braces,
	Calendar,
	ChevronsLeftRightEllipsisIcon,
	Clock,
	DollarSign,
	FileText,
	Globe,
	Hash,
	Text,
	ToggleLeft,
	Type,
	TypeIcon,
} from 'lucide-react'

export interface TypeMapping {
	icon: LucideIcon
	label: string
	color: string
	description: string
}

const typeMap: Record<string, TypeMapping> = {
	// String types
	varchar: {
		icon: Type,
		label: 'VARCHAR',
		color: 'text-blue-500',
		description: 'Variable-length string',
	},
	text: {
		icon: Text,
		label: 'TEXT',
		color: 'text-blue-600',
		description: 'Long text content',
	},
	longtext: {
		icon: FileText,
		label: 'LONGTEXT',
		color: 'text-blue-700',
		description: 'Very long text (4GB)',
	},
	mediumtext: {
		icon: FileText,
		label: 'MEDIUMTEXT',
		color: 'text-blue-600',
		description: 'Medium-length text (16MB)',
	},
	tinytext: {
		icon: Text,
		label: 'TINYTEXT',
		color: 'text-blue-400',
		description: 'Short text (255 bytes)',
	},
	char: {
		icon: Type,
		label: 'CHAR',
		color: 'text-blue-500',
		description: 'Fixed-length string',
	},

	// Numeric types
	integer: {
		icon: Hash,
		label: 'INTEGER',
		color: 'text-green-500',
		description: 'Whole number (4 bytes)',
	},
	int: {
		icon: Hash,
		label: 'INT',
		color: 'text-green-500',
		description: 'Whole number (4 bytes)',
	},
	bigint: {
		icon: Hash,
		label: 'BIGINT',
		color: 'text-green-600',
		description: 'Large whole number (8 bytes)',
	},
	smallint: {
		icon: Hash,
		label: 'SMALLINT',
		color: 'text-green-400',
		description: 'Small whole number (2 bytes)',
	},
	tinyint: {
		icon: Hash,
		label: 'TINYINT',
		color: 'text-green-400',
		description: 'Tiny number (1 byte)',
	},
	decimal: {
		icon: DollarSign,
		label: 'DECIMAL',
		color: 'text-emerald-500',
		description: 'Exact decimal number',
	},
	numeric: {
		icon: DollarSign,
		label: 'NUMERIC',
		color: 'text-emerald-500',
		description: 'Exact decimal number',
	},
	float: {
		icon: Hash,
		label: 'FLOAT',
		color: 'text-green-500',
		description: 'Floating-point number',
	},
	double: {
		icon: Hash,
		label: 'DOUBLE',
		color: 'text-green-600',
		description: 'Double-precision float',
	},
	real: {
		icon: Hash,
		label: 'REAL',
		color: 'text-green-500',
		description: 'Single-precision float',
	},

	// Boolean
	boolean: {
		icon: ToggleLeft,
		label: 'BOOLEAN',
		color: 'text-yellow-500',
		description: 'True/False value',
	},
	bool: {
		icon: ToggleLeft,
		label: 'BOOL',
		color: 'text-yellow-500',
		description: 'True/False value',
	},

	// Date/Time
	date: {
		icon: Calendar,
		label: 'DATE',
		color: 'text-purple-500',
		description: 'Calendar date',
	},
	datetime: {
		icon: Clock,
		label: 'DATETIME',
		color: 'text-purple-600',
		description: 'Date and time',
	},
	timestamp: {
		icon: Clock,
		label: 'TIMESTAMP',
		color: 'text-purple-600',
		description: 'Timestamp with timezone',
	},
	time: {
		icon: Clock,
		label: 'TIME',
		color: 'text-purple-500',
		description: 'Time of day',
	},
	year: {
		icon: Calendar,
		label: 'YEAR',
		color: 'text-purple-400',
		description: 'Year value',
	},

	// Binary
	blob: {
		icon: Binary,
		label: 'BLOB',
		color: 'text-gray-500',
		description: 'Binary large object',
	},
	longblob: {
		icon: Binary,
		label: 'LONGBLOB',
		color: 'text-gray-600',
		description: 'Large binary data',
	},
	binary: {
		icon: Binary,
		label: 'BINARY',
		color: 'text-gray-500',
		description: 'Fixed-length binary',
	},
	varbinary: {
		icon: Binary,
		label: 'VARBINARY',
		color: 'text-gray-500',
		description: 'Variable-length binary',
	},

	// JSON/XML
	json: {
		icon: Braces,
		label: 'JSON',
		color: 'text-orange-500',
		description: 'JSON data',
	},
	jsonb: {
		icon: Braces,
		label: 'JSONB',
		color: 'text-orange-600',
		description: 'Binary JSON (PostgreSQL)',
	},
	xml: {
		icon: FileText,
		label: 'XML',
		color: 'text-orange-500',
		description: 'XML data',
	},

	// Special
	uuid: {
		icon: Globe,
		label: 'UUID',
		color: 'text-cyan-500',
		description: 'Universally unique identifier',
	},
	enum: {
		icon: Type,
		label: 'ENUM',
		color: 'text-indigo-500',
		description: 'Enumeration of values',
	},
	set: {
		icon: TypeIcon,
		label: 'SET',
		color: 'text-indigo-500',
		description: 'Set of values',
	},

	// Default fallback
	unknown: {
		icon: ChevronsLeftRightEllipsisIcon,
		label: 'UNKNOWN',
		color: 'text-gray-400',
		description: 'Unknown data type',
	},
}

export function getTypeInfo(dataType: string): TypeMapping {
	if (!dataType) return typeMap['unknown']

	// Normalize: lowercase, trim, remove size/precision (varchar(255) -> varchar)
	const normalized = dataType
		.toLowerCase()
		.trim()
		.replace(/\s+/g, ' ')
		.replace(/\([^)]*\)/g, '') // Remove (255), (10,2), etc.
		.replace(/\[\]/g, '') // Remove PostgreSQL array notation []

	return typeMap[normalized] || typeMap['unknown']
}

export function getTypeIcon(dataType: string): LucideIcon {
	return getTypeInfo(dataType).icon
}

export function isStringType(dataType: string): boolean {
	const stringTypes = [
		'varchar',
		'text',
		'longtext',
		'mediumtext',
		'tinytext',
		'char',
	]
	const normalized = dataType.toLowerCase().replace(/\([^)]*\)/g, '')
	return stringTypes.includes(normalized)
}

export function isNumberType(dataType: string): boolean {
	const numberTypes = [
		'integer',
		'int',
		'bigint',
		'smallint',
		'tinyint',
		'decimal',
		'numeric',
		'float',
		'double',
		'real',
	]
	const normalized = dataType.toLowerCase().replace(/\([^)]*\)/g, '')
	return numberTypes.includes(normalized)
}
