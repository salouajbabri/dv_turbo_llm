
// Types
export type TableMetadata = {
  tableName: string;
  primaryKey: string[];
  foreignKeys: {
    column: string;
    references: {
      table: string;
      column: string;
    };
  }[];
  columns: string[];
};

export type GeneratedFile = {
  fileName: string;
  content: string;
};

// Mock API calls - would be replaced with real API calls in production

// Mock function to upload CSV files
export const uploadCSVFiles = async (files: File[]): Promise<{ success: boolean; fileNames: string[] }> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Return success response with file names
  return {
    success: true,
    fileNames: files.map(file => file.name)
  };
};

// Mock function to upload schema.yml file
export const uploadSchemaFile = async (file: File): Promise<{ success: boolean; fileName: string }> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Return success response
  return {
    success: true,
    fileName: file.name
  };
};

// Mock function to generate Data Vault SQL models
export const generateModels = async (csvFiles: string[], schemaFile: string): Promise<GeneratedFile[]> => {
  // Simulate API call delay (LLM processing would take time)
  await new Promise(resolve => setTimeout(resolve, 4000));
  
  // Generate mock file content based on table names extracted from file names
  const tableNames = csvFiles.map(fileName => {
    // Extract table name from file name (e.g., STG_ORDERS.csv -> ORDERS)
    const match = fileName.match(/STG_([A-Z_]+)\.csv/i);
    return match ? match[1].toLowerCase() : fileName.replace('.csv', '').toLowerCase();
  });
  
  // Return mock generated files
  return tableNames.map(tableName => ({
    fileName: `v_stg_${tableName}.sql`,
    content: `-- Generated Data Vault 2.0 stage model for ${tableName}
{# dbt model for ${tableName} staging #}

{{
    config(
        materialized='view'
    )
}}

{%- set source_model = "STG_${tableName.toUpperCase()}" -%}
{%- set src_pk = "${tableName}_HK" -%}
{%- set src_hashdiff = "${tableName}_HASHDIFF" -%}

{%- set src_payload = [
    "COLUMN1",
    "COLUMN2",
    "COLUMN3" 
] -%}

{%- set src_eff = "EFFECTIVE_FROM" -%}
{%- set src_ldts = "LOAD_DATE" -%}
{%- set src_source = "RECORD_SOURCE" -%}

{{ automate_dv.stage(
    source_model=source_model,
    src_pk=src_pk,
    src_hashdiff=src_hashdiff,
    src_payload=src_payload,
    src_eff=src_eff,
    src_ldts=src_ldts,
    src_source=src_source
) }}
`
  }));
};

// Mock function to analyze schema and extract metadata
export const analyzeSchema = async (csvFiles: string[], schemaFile: string): Promise<TableMetadata[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Generate mock metadata based on table names extracted from file names
  const tableNames = csvFiles.map(fileName => {
    // Extract table name from file name (e.g., STG_ORDERS.csv -> ORDERS)
    const match = fileName.match(/STG_([A-Z_]+)\.csv/i);
    return match ? match[1].toUpperCase() : fileName.replace('.csv', '').toUpperCase();
  });
  
  // Return mock metadata
  return tableNames.map(tableName => ({
    tableName,
    primaryKey: [`${tableName}_ID`],
    foreignKeys: tableName === 'ORDERS' ? [
      {
        column: 'CUSTOMER_ID',
        references: {
          table: 'CUSTOMERS',
          column: 'CUSTOMER_ID'
        }
      }
    ] : [],
    columns: [
      `${tableName}_ID`,
      'NAME',
      'DESCRIPTION',
      'CREATED_AT',
      'UPDATED_AT'
    ]
  }));
};
