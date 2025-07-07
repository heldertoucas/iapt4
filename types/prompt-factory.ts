/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

// --- Type Definitions for Fábrica de Prompts ---

export type PlaceholderOption = string;

export type Placeholder = {
  key: string;
  label: string;
  options: PlaceholderOption[];
};

export type Recipe = {
  id: string;
  categoryId: string;
  title: string;
  icon_name: string;
  template: string;
  type: 'text' | 'image';
  placeholders: Placeholder[];
  advanced_tips: [string, string];
  fallback_outputs: [string, string];
  total_score: number;
  vote_count: number;
};

export type Category = {
  id: string;
  title: string;
  icon_name: string;
};