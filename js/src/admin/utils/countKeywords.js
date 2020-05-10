/**
 * Check if the keywords field is filled in correctly
 * 
 * @param string _keywords 
 */
export default function countKeywords(_keywords) {
    // No keywords set up yet
    if(_keywords == "") return true;

    // Split all commas
    const keywords = _keywords.split(",");
    let status_ok = true;

    // Go through all keywords
    for (let keyword of keywords) {
        // Keywords shouldn't have more then three spaces
        if(keyword.split(" ").length > 4) {
            status_ok = false;

            break;
        }
    };
    
    // Seems allright
    return status_ok;
}