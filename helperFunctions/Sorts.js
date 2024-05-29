class Sorts {
    //lowest swr to highest
    static swrLowFirst(a, b) {
        const aSWRYear = parseInt(a.swrNum.substring(0, 2));
        const bSWRYear = parseInt(b.swrNum.substring(0, 2));
        const aSWR4 = parseInt(a.swrNum.substring(3));
        const bSWR4 = parseInt(b.swrNum.substring(3));

        if (aSWRYear < bSWRYear) {
            return -1;
        } else if (aSWRYear > bSWRYear) {
            return 1;
        } else {
            if (aSWR4 < bSWR4) {
                return -1;
            } else if (aSWR4 > bSWR4) {
                return 1;
            } else {
                return 0;
            }
        }
    }

    //highest swr to lowest swr
    static swrHighFirst(a, b) {
        const aSWRYear = parseInt(a.swrNum.substring(0, 2));
        const bSWRYear = parseInt(b.swrNum.substring(0, 2));
        const aSWR4 = parseInt(a.swrNum.substring(3));
        const bSWR4 = parseInt(b.swrNum.substring(3));

        if (aSWRYear > bSWRYear) {
            return -1;
        } else if (aSWRYear < bSWRYear) {
            return 1;
        } else {
            if (aSWR4 > bSWR4) {
                return -1;
            } else if (aSWR4 < bSWR4) {
                return 1;
            } else {
                return 0;
            }
        }
    }

    //oldest date to newest date
    static dateCreatedOld(a, b) {
        //years
        const aYear = parseInt(a.dateSubmitted.toISOString().substring(0, 4));
        const bYear = parseInt(b.dateSubmitted.toISOString().substring(0, 4));

        //months
        const aMonth = parseInt(a.dateSubmitted.toISOString().substring(5, 7));
        const bMonth = parseInt(b.dateSubmitted.toISOString().substring(5, 7));

        //days
        const aDay = parseInt(a.dateSubmitted.toISOString().substring(8, 10));
        const bDay = parseInt(b.dateSubmitted.toISOString().substring(8, 10));


        if (aYear > bYear) {
            return 1;
        } else if (aYear < bYear) {
            return -1;
        } else {
            if (aMonth > bMonth) {
                return 1;
            } else if (aMonth < bMonth) {
                return -1;
            } else {
                if (aDay > bDay) {
                    return 1;
                } else if (aDay < bDay) {
                    return -1;
                } else {
                    return 0;
                }
            }
        }
    }


    //newest date to oldest date
    static dateCreatedNew(a, b) {
        //years
        const aYear = parseInt(a.dateSubmitted.toISOString().substring(0, 4));
        const bYear = parseInt(b.dateSubmitted.toISOString().substring(0, 4));

        //months
        const aMonth = parseInt(a.dateSubmitted.toISOString().substring(5, 7));
        const bMonth = parseInt(b.dateSubmitted.toISOString().substring(5, 7));

        //days
        const aDay = parseInt(a.dateSubmitted.toISOString().substring(8, 10));
        const bDay = parseInt(b.dateSubmitted.toISOString().substring(8, 10));


        if (aYear < bYear) {
            return 1;
        } else if (aYear > bYear) {
            return -1;
        } else {
            if (aMonth < bMonth) {
                return 1;
            } else if (aMonth > bMonth) {
                return -1;
            } else {
                if (aDay < bDay) {
                    return 1;
                } else if (aDay > bDay) {
                    return -1;
                } else {
                    return 0;
                }
            }
        }
    }

    //oldest to newest date completed
    static dateCompleteOld(a, b) {
        const aDate = a.dateClosed;
        const bDate = b.dateClosed;
        if ((aDate === null || aDate === undefined) && (bDate === null || bDate === undefined)) {
            return 0;
        } else if (aDate === null || aDate === undefined) {
            return 1;
        } else if (bDate === null || bDate === undefined) {
            return -1;
        } else {
            //years
            const aYear = parseInt(aDate.toISOString().substring(0, 4));
            const bYear = parseInt(bDate.toISOString().substring(0, 4));

            //months
            const aMonth = parseInt(aDate.toISOString().substring(5, 7));
            const bMonth = parseInt(b.dateSubmitted.toISOString().substring(5, 7));

            //days
            const aDay = parseInt(aDate.toISOString().substring(8, 10));
            const bDay = parseInt(bDate.toISOString().substring(8, 10));


            if (aYear > bYear) {
                return 1;
            } else if (aYear < bYear) {
                return -1;
            } else {
                if (aMonth > bMonth) {
                    return 1;
                } else if (aMonth < bMonth) {
                    return -1;
                } else {
                    if (aDay > bDay) {
                        return 1;
                    } else if (aDay < bDay) {
                        return -1;
                    } else {
                        return 0;
                    }
                }
            }
        }
    }



    //newest date to oldest date completed
    static dateCompleteNew(a, b) {
        const aDate = a.dateClosed;
        const bDate = b.dateClosed;
        if ((aDate === null || aDate === undefined) && (bDate === null || bDate === undefined)) {
            return 0;
        } else if (aDate === null || aDate === undefined) {
            return 1;
        } else if (bDate === null || bDate === undefined) {
            return -1;
        } else {
            //years
            const aYear = parseInt(aDate.toISOString().substring(0, 4));
            const bYear = parseInt(bDate.toISOString().substring(0, 4));

            //months
            const aMonth = parseInt(aDate.toISOString().substring(5, 7));
            const bMonth = parseInt(b.dateSubmitted.toISOString().substring(5, 7));

            //days
            const aDay = parseInt(aDate.toISOString().substring(8, 10));
            const bDay = parseInt(bDate.toISOString().substring(8, 10));


            if (aYear < bYear) {
                return 1;
            } else if (aYear > bYear) {
                return -1;
            } else {
                if (aMonth < bMonth) {
                    return 1;
                } else if (aMonth > bMonth) {
                    return -1;
                } else {
                    if (aDay < bDay) {
                        return 1;
                    } else if (aDay > bDay) {
                        return -1;
                    } else {
                        return 0;
                    }
                }
            }
        }
    }

    //a-z name sort then by dateCreatedNew
    static azOriginator(a, b) {
        const aName = a.originator.toLowerCase();
        const bName = b.originator.toLowerCase();

        if (aName > bName) {
            return 1;
        } else if (aName < bName) {
            return -1;
        } else {
            return Sorts.dateCreatedNew(a, b);
        }
    }

    //z-a name sort then by dateCreatedNew
    static zaOriginator(a, b) {
        const aName = a.originator.toLowerCase();
        const bName = b.originator.toLowerCase();

        if (aName < bName) {
            return 1;
        } else if (aName > bName) {
            return -1;
        } else {
            return Sorts.dateCreatedNew(a, b);
        }
    }

    //a-z title sort then by dateCreatedNew
    static azTitle(a, b) {
        const aTitle = a.title.toLowerCase();
        const bTitle = b.title.toLowerCase();

        if (aTitle > bTitle) {
            return 1;
        } else if (aTitle < bTitle) {
            return -1;
        } else {
            return Sorts.dateCreatedNew(a, b);
        }
    }

    //z-a title sort then by dateCreatedNew
    static zaTitle(a, b) {
        const aTitle = a.title.toLowerCase();
        const bTitle = b.title.toLowerCase();

        if (aTitle < bTitle) {
            return 1;
        } else if (aTitle > bTitle) {
            return -1;
        } else {
            return Sorts.dateCreatedNew(a, b);
        }
    }

    //1-4 priority sort then by dateCreatedNew
    static priority14(a, b) {
        const aPriority = a.priority;
        const bPriority = b.priority;

        if (aPriority > bPriority) {
            return 1;
        } else if (aPriority < bPriority) {
            return -1;
        } else {
            return Sorts.dateCreatedNew(a, b);
        }
    }
    //4-1 priority sort then by dateCreatedNew
    static priority41(a, b) {
        const aPriority = a.priority;
        const bPriority = b.priority;

        if (aPriority > bPriority) {
            return 1;
        } else if (aPriority < bPriority) {
            return -1;
        } else {
            return Sorts.dateCreatedNew(a, b);
        }
    }

}

module.exports = Sorts;
