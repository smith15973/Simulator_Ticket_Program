class ParseDate {
    static year4Digit(date) {
        return date.toISOString().substring(0, 4);
    }
    static year2Digit(date) {
        return date.toISOString().substring(2, 4);
    }

    static month(date) {
        return date.toISOString().substring(5, 7);
    }

    static day(date) {
        return date.toISOString().substring(8, 10);
    }

    static fullDate(date) {
        return `${ParseDate.month(date)}/${ParseDate.day(date)}/${ParseDate.year4Digit(date)}`
    }
}

module.exports = ParseDate;