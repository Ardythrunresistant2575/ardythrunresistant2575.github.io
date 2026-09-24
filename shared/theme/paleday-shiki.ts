import type { ThemeRegistrationRaw } from 'shiki'

/**
 * Paleday Tailwind as a TextMate theme.
 *
 * The scope assignments are Material Palenight's, because Paleday IS Palenight:
 * every colour below is the channel-wise complement of the Palenight role it
 * replaces, snapped back onto the nearest Tailwind v4 value in OKLab. The
 * mapping is taken straight from the Omarchy theme's own annotations, so a
 * keyword here is the same *role* a keyword is in the editor — it has just
 * flipped hue along with the ground.
 *
 *   role      paleday              was (palenight)        used for
 *   ────────  ───────────────────  ─────────────────────  ──────────────────
 *   magenta   #497d00 lime-700     purple-400  keyword    keywords
 *   blue      #733e0a yellow-900   indigo-300  function   functions
 *   yellow    #1c398e blue-900     orange-300  class      types, classes
 *   green     #2f0d68 violet-950   lime-200    string     strings
 *   orange    #2b7fff blue-500     orange-400  number     numbers, constants
 *   cyan      #7e2a0c orange-900   sky-300     operator   operators, punctuation
 *   red       #009689 teal-600     rose-400    tag        tags, properties
 *   muted     #7c7c67 olive-500    slate-500   comment    comments
 *   fg        #2b2b22 olive-800    slate-300   foreground everything else
 *
 * The background is `transparent`: code blocks sit on the page's single ground
 * like everything else, set off by an accent bar rather than a filled box.
 */

const FG = '#2b2b22' // olive-800   — foreground
const MUTED = '#7c7c67' // olive-500   — comment
const KEYWORD = '#497d00' // lime-700    — keyword
const FUNCTION = '#733e0a' // yellow-900  — function
const TYPE = '#1c398e' // blue-900    — class
const STRING = '#2f0d68' // violet-950  — string
const NUMBER = '#2b7fff' // blue-500    — number
const OPERATOR = '#7e2a0c' // orange-900  — operator
const TAG = '#009689' // teal-600    — tag
const INVALID = '#fb2c36' // red-500     — error
const REGEX = '#00d5be' // teal-400    — regex
const ACCENT = '#5ea500' // lime-600    — accent

export const paleday: ThemeRegistrationRaw = {
  name: 'paleday-tailwind',
  type: 'light',
  colors: {
    'editor.background': 'transparent',
    'editor.foreground': FG,
  },
  settings: [
    { settings: { background: 'transparent', foreground: FG } },

    // Comments and documentation
    {
      scope: ['comment', 'punctuation.definition.comment', 'string.comment'],
      settings: { foreground: MUTED, fontStyle: 'italic' },
    },

    // Keywords, storage, control flow
    {
      scope: [
        'keyword',
        'keyword.control',
        'keyword.operator.expression',
        'keyword.operator.new',
        'keyword.other',
        'storage',
        'storage.type',
        'storage.modifier',
        'variable.language',
        'keyword.control.at-rule',
      ],
      settings: { foreground: KEYWORD },
    },

    // Operators and punctuation — the connective tissue
    {
      scope: [
        'keyword.operator',
        'punctuation',
        'punctuation.separator',
        'punctuation.terminator',
        'punctuation.accessor',
        'punctuation.definition.parameters',
        'punctuation.definition.block',
        'punctuation.section',
        'meta.brace',
        'meta.delimiter',
      ],
      settings: { foreground: OPERATOR },
    },

    // Strings
    {
      scope: [
        'string',
        'string.quoted',
        'string.template',
        'punctuation.definition.string',
        'meta.attribute-selector string',
      ],
      settings: { foreground: STRING },
    },

    // String escapes and regular expressions
    {
      scope: ['constant.character.escape', 'string.regexp', 'constant.regexp'],
      settings: { foreground: REGEX },
    },

    // Numbers, booleans, language constants
    {
      scope: [
        'constant.numeric',
        'constant.language',
        'constant.character',
        'constant.other',
        'support.constant',
      ],
      settings: { foreground: NUMBER },
    },

    // Functions and macros
    {
      scope: [
        'entity.name.function',
        'support.function',
        'meta.function-call',
        'meta.function-call.generic',
        'entity.name.function.macro',
        'support.function.builtin',
      ],
      settings: { foreground: FUNCTION },
    },

    // Types, classes, structs, traits
    {
      scope: [
        'entity.name.type',
        'entity.name.class',
        'entity.name.struct',
        'entity.name.enum',
        'entity.name.trait',
        'entity.name.namespace',
        'entity.other.inherited-class',
        'support.type',
        'support.class',
        'storage.type.primitive',
      ],
      settings: { foreground: TYPE },
    },

    // Tags, object keys, attributes
    {
      scope: [
        'entity.name.tag',
        'meta.tag',
        'support.type.property-name',
        'entity.other.attribute-name',
        'variable.other.property',
        'meta.object-literal.key',
        'meta.property-name',
      ],
      settings: { foreground: TAG },
    },

    // Attribute values and decorators lean on the accent
    {
      scope: ['entity.name.tag.custom', 'meta.decorator', 'entity.name.function.decorator'],
      settings: { foreground: ACCENT },
    },

    // Plain variables and parameters stay at foreground weight
    {
      scope: ['variable', 'variable.other', 'variable.parameter', 'meta.definition.variable.name'],
      settings: { foreground: FG },
    },

    // Rust lifetimes and attributes read as annotations, not code
    {
      scope: ['storage.modifier.lifetime', 'entity.name.lifetime', 'meta.attribute.rust'],
      settings: { foreground: MUTED },
    },

    // Shell: the command itself is the subject of the line
    {
      scope: ['source.shell support.function', 'entity.name.command', 'support.function.builtin.shell'],
      settings: { foreground: FUNCTION },
    },

    // Markup
    { scope: ['markup.heading'], settings: { foreground: FUNCTION, fontStyle: 'bold' } },
    { scope: ['markup.inserted'], settings: { foreground: ACCENT } },
    { scope: ['markup.deleted'], settings: { foreground: INVALID } },
    { scope: ['markup.bold'], settings: { fontStyle: 'bold' } },
    { scope: ['markup.italic'], settings: { fontStyle: 'italic' } },

    { scope: ['invalid', 'invalid.illegal'], settings: { foreground: INVALID } },
  ],
}

export default paleday
