export function escapeGraphQLString(str) {
  try {
    str = str.replace(/\\/g, '\\\\');
    str = str.replace(/"/g, '\\"');
    str = str.replace(/\n/g, '\\n');
    return str;
  } catch (e) {
    return str;
  }
};