export function extractAllText(nodes) {
    let textFound = false;
   
     const result = nodes.map((node) => {
         if (textFound) {
             return null; // Skip mapping if a text node has already been found
         }
   
         if (node.type === 'text') {
             textFound = true; // Set the flag to true when a text node is found
             return node.content;
         } else if (node.children) {
             return extractAllText(node.children);
         }
   
         return null;
     }).flat().filter(Boolean).join(' ');
   
     return result;
   }
   