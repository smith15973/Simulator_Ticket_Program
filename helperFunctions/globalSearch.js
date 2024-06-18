function searchQuery(search, res) {
    let query = [];

    if (!isNaN(search)) {
        query.push({ priority: Number(parseInt(search)) });
    }

    query.push({ system: { $regex: search, $options: 'i' } });
    query.push({ impactedTraining: { $regex: search, $options: 'i' } });
    query.push({ captured: { $regex: search, $options: 'i' } });
    query.push({ status: { $regex: search, $options: 'i' } });
    query.push({ swrNum: { $regex: search, $options: 'i' } });
    query.push({ originator: { $regex: search, $options: 'i' } });
    query.push({ assignedTo: { $regex: search, $options: 'i' } });
    query.push({ validatedBy: { $regex: search, $options: 'i' } });
    query.push({ title: { $regex: search, $options: 'i' } });
    query.push({ description: { $regex: search, $options: 'i' } });
    query.push({ workPerformed: { $regex: search, $options: 'i' } });
    query.push({ 'attachments.originalName': { $regex: search, $options: 'i' } });
    //query.push({ dateSubmitted: { $regex: search, $options: 'i' } });
    //query.push({ dateClosed: { $regex: search, $options: 'i' } });
    if (!res.locals.currentUser.admin) {
        query.author = res.locals.currentUser
    }


    return { $or: query, author:query.author };
}


module.exports = searchQuery