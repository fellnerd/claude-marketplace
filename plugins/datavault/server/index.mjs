#!/usr/bin/env node

/**
 * DataVault MCP Server
 * Ein Model Context Protocol Server für sichere Datenspeicherung
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { homedir } from 'os';

// Vault Speicherort
const VAULT_DIR = process.env.DATAVAULT_DIR || join(homedir(), '.datavault');
const VAULT_FILE = join(VAULT_DIR, 'vault.json');

// Vault Datenstruktur
let vaultData = {
  version: '1.0.0',
  created: new Date().toISOString(),
  updated: new Date().toISOString(),
  entries: {}
};

// Vault laden oder initialisieren
function loadVault() {
  if (!existsSync(VAULT_DIR)) {
    mkdirSync(VAULT_DIR, { recursive: true });
  }
  
  if (existsSync(VAULT_FILE)) {
    try {
      const data = readFileSync(VAULT_FILE, 'utf-8');
      vaultData = JSON.parse(data);
    } catch (error) {
      console.error('Fehler beim Laden des Vaults:', error);
    }
  } else {
    saveVault();
  }
}

// Vault speichern
function saveVault() {
  vaultData.updated = new Date().toISOString();
  writeFileSync(VAULT_FILE, JSON.stringify(vaultData, null, 2), 'utf-8');
}

// Server erstellen
const server = new Server(
  {
    name: 'datavault',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Tools definieren
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'vault_store',
        description: 'Speichert einen Wert im DataVault unter einem Schlüssel',
        inputSchema: {
          type: 'object',
          properties: {
            key: {
              type: 'string',
              description: 'Der Schlüssel unter dem der Wert gespeichert wird',
            },
            value: {
              type: 'string',
              description: 'Der zu speichernde Wert',
            },
            tags: {
              type: 'array',
              items: { type: 'string' },
              description: 'Optionale Tags zur Kategorisierung',
            },
          },
          required: ['key', 'value'],
        },
      },
      {
        name: 'vault_get',
        description: 'Ruft einen Wert aus dem DataVault ab',
        inputSchema: {
          type: 'object',
          properties: {
            key: {
              type: 'string',
              description: 'Der Schlüssel des abzurufenden Werts',
            },
          },
          required: ['key'],
        },
      },
      {
        name: 'vault_delete',
        description: 'Löscht einen Eintrag aus dem DataVault',
        inputSchema: {
          type: 'object',
          properties: {
            key: {
              type: 'string',
              description: 'Der Schlüssel des zu löschenden Eintrags',
            },
          },
          required: ['key'],
        },
      },
      {
        name: 'vault_list',
        description: 'Listet alle Schlüssel im DataVault auf',
        inputSchema: {
          type: 'object',
          properties: {
            filter: {
              type: 'string',
              description: 'Optionaler Filter für Schlüsselnamen',
            },
            tag: {
              type: 'string',
              description: 'Filtert nach Tag',
            },
          },
        },
      },
      {
        name: 'vault_search',
        description: 'Durchsucht den DataVault nach Werten',
        inputSchema: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'Suchbegriff',
            },
          },
          required: ['query'],
        },
      },
      {
        name: 'vault_stats',
        description: 'Zeigt Statistiken über den DataVault',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      {
        name: 'vault_export',
        description: 'Exportiert alle Daten aus dem DataVault',
        inputSchema: {
          type: 'object',
          properties: {
            format: {
              type: 'string',
              enum: ['json', 'csv'],
              description: 'Export-Format (Standard: json)',
            },
          },
        },
      },
    ],
  };
});

// Tool-Aufrufe verarbeiten
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case 'vault_store': {
      const { key, value, tags = [] } = args;
      vaultData.entries[key] = {
        value,
        tags,
        created: vaultData.entries[key]?.created || new Date().toISOString(),
        updated: new Date().toISOString(),
      };
      saveVault();
      return {
        content: [
          {
            type: 'text',
            text: `✓ Wert unter "${key}" gespeichert`,
          },
        ],
      };
    }

    case 'vault_get': {
      const { key } = args;
      const entry = vaultData.entries[key];
      if (!entry) {
        return {
          content: [
            {
              type: 'text',
              text: `✗ Schlüssel "${key}" nicht gefunden`,
            },
          ],
          isError: true,
        };
      }
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              key,
              value: entry.value,
              tags: entry.tags,
              created: entry.created,
              updated: entry.updated,
            }, null, 2),
          },
        ],
      };
    }

    case 'vault_delete': {
      const { key } = args;
      if (!vaultData.entries[key]) {
        return {
          content: [
            {
              type: 'text',
              text: `✗ Schlüssel "${key}" nicht gefunden`,
            },
          ],
          isError: true,
        };
      }
      delete vaultData.entries[key];
      saveVault();
      return {
        content: [
          {
            type: 'text',
            text: `✓ Eintrag "${key}" gelöscht`,
          },
        ],
      };
    }

    case 'vault_list': {
      const { filter, tag } = args || {};
      let keys = Object.keys(vaultData.entries);
      
      if (filter) {
        keys = keys.filter(k => k.includes(filter));
      }
      
      if (tag) {
        keys = keys.filter(k => vaultData.entries[k].tags?.includes(tag));
      }
      
      const entries = keys.map(key => ({
        key,
        tags: vaultData.entries[key].tags || [],
        updated: vaultData.entries[key].updated,
      }));
      
      return {
        content: [
          {
            type: 'text',
            text: entries.length > 0 
              ? JSON.stringify(entries, null, 2)
              : 'Keine Einträge gefunden',
          },
        ],
      };
    }

    case 'vault_search': {
      const { query } = args;
      const results = Object.entries(vaultData.entries)
        .filter(([key, entry]) => 
          key.toLowerCase().includes(query.toLowerCase()) ||
          String(entry.value).toLowerCase().includes(query.toLowerCase()) ||
          entry.tags?.some(t => t.toLowerCase().includes(query.toLowerCase()))
        )
        .map(([key, entry]) => ({
          key,
          value: entry.value,
          tags: entry.tags,
        }));
      
      return {
        content: [
          {
            type: 'text',
            text: results.length > 0
              ? JSON.stringify(results, null, 2)
              : `Keine Ergebnisse für "${query}"`,
          },
        ],
      };
    }

    case 'vault_stats': {
      const entries = Object.entries(vaultData.entries);
      const allTags = [...new Set(entries.flatMap(([_, e]) => e.tags || []))];
      
      const stats = {
        totalEntries: entries.length,
        created: vaultData.created,
        lastUpdated: vaultData.updated,
        uniqueTags: allTags.length,
        tags: allTags,
        vaultLocation: VAULT_FILE,
      };
      
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(stats, null, 2),
          },
        ],
      };
    }

    case 'vault_export': {
      const { format = 'json' } = args || {};
      
      if (format === 'csv') {
        const header = 'key,value,tags,created,updated';
        const rows = Object.entries(vaultData.entries)
          .map(([key, entry]) => 
            `"${key}","${entry.value}","${(entry.tags || []).join(';')}","${entry.created}","${entry.updated}"`
          );
        return {
          content: [
            {
              type: 'text',
              text: [header, ...rows].join('\n'),
            },
          ],
        };
      }
      
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(vaultData, null, 2),
          },
        ],
      };
    }

    default:
      return {
        content: [
          {
            type: 'text',
            text: `Unbekanntes Tool: ${name}`,
          },
        ],
        isError: true,
      };
  }
});

// Server starten
async function main() {
  loadVault();
  
  const transport = new StdioServerTransport();
  await server.connect(transport);
  
  console.error('DataVault MCP Server gestartet');
}

main().catch(console.error);
