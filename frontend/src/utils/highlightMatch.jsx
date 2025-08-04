

export default function highlightMatch(text, query){

    if(!query) return text

    const regex = new RegExp(`(${query})`, "gi")
    const parts = text.split('')
    const target = query.split('')
    parts.map(part => {
      if(target == part) console.log(part);
    })

    return parts.map((part, i) => {
            regex.test(part) ? <mark key={i} className="bg-blue-400 px-1">{part}</mark> : <span key={i}>{part}</span>
        })
}