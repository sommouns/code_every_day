function patternMatch(str, reg) {
    if (!str || !reg) {
        return 'Invalid Input'
    }
    return matchCore(str, reg, 0, 0)
}

function matchCore(str, pattern, i, j) {
    // i代表str中的索引，j代表正则中的索引
    if (pattern.length === j) {
        return 'Full matched'
    }
    
    // *
    if (j + 1 < pattern.length && pattern[j+1] === '*') {
        // 匹配通过
        if (str[i] && (pattern[j] === '.' || pattern[j] === str[i])) {
            return matchCore(str, pattern, i + 1, j) || 
            matchCore(str, pattern, i + 1, j) ||
            matchCore(str, pattern, i + 1, j + 2)
        } else return matchCore(str, pattern, i, j + 2)
    }

    // .
    if ((j + 1 < pattern.length && pattern[j] === '.') || pattern[j] === str[i]) {
        return matchCore(str, pattern, i + 1, j + 1)
    }

    return 'Match fail'
}
console.log(patternMatch('aaba', 'aa.a'))