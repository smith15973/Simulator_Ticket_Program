function getQuery(req) {
    let query = {};

    // Check if priorities are provided
    if (req.query.priority) {
        if (Array.isArray(req.query.priority)) {
            query.priority = { $in: req.query.priority.map(Number) };
        } else {
            query.priority = Number(req.query.priority);
        }
    }

    // Check if systems are provided
    if (req.query.system) {
        if (Array.isArray(req.query.system)) {
            query.system = { $in: req.query.system.map(String) };
        } else {
            query.system = String(req.query.system);
        }
    }

    // Check if impactedTraining are provided
    if (req.query.impactedTraining) {
        if (Array.isArray(req.query.impactedTraining)) {
            query.impactedTraining = { $in: req.query.impactedTraining.map(String) };
        } else {
            query.impactedTraining = String(req.query.impactedTraining);
        }
    }

    // Check if captured are provided
    if (req.query.captured) {
        if (Array.isArray(req.query.captured)) {
            query.captured = { $in: req.query.captured.map(String) };
        } else {
            query.captured = String(req.query.captured);
        }
    }

    // Check if statuses are provided
    if (req.query.status) {
        if (Array.isArray(req.query.status)) {
            query.status = { $in: req.query.status.map(String) };
        } else {
            query.status = String(req.query.status);
        }
    }

    //check if swr range is provided
    if (req.query.swrMin && req.query.swrMin !== '' && req.query.swrMax && req.query.swrMax !== '') {
        query.swrNum = { $gte: req.query.swrMin, $lte: req.query.swrMax };
    } else if (req.query.swrMin && req.query.swrMin !== '') {
        query.swrNum = { $gte: req.query.swrMin }
    } else if (req.query.swrMax && req.query.swrMax !== '') {
        query.swrNum = { $lte: req.query.swrMax }
    }

    //check if date submitted range is provided
    if (req.query.dateSubMin && req.query.dateSubMin !== '' && req.query.dateSubMax && req.query.dateSubMax !== '') {
        query.dateSubmitted = { $gte: req.query.dateSubMin, $lte: req.query.dateSubMax };
    } else if (req.query.dateSubMin && req.query.dateSubMin !== '') {
        query.dateSubmitted = { $gte: req.query.dateSubMin }
    } else if (req.query.dateSubMax && req.query.dateSubMax !== '') {
        query.dateSubmitted = { $lte: req.query.dateSubMax }
    }

    //check if date closed range is provided
    if (req.query.dateClosedMin && req.query.dateClosedMin !== '' && req.query.dateClosedMax && req.query.dateClosedMax !== '') {
        query.dateClosed = { $gte: req.query.dateClosedMin, $lte: req.query.dateClosedMax };
    } else if (req.query.dateClosedMin && req.query.dateClosedMin !== '') {
        query.dateClosed = { $gte: req.query.dateClosedMin }
    } else if (req.query.dateClosedMax && req.query.dateClosedMax !== '') {
        query.dateClosed = { $lte: req.query.dateClosedMax }
    }

    //check if originator is provided
    if (req.query.originator && req.query.originator !== '') {
        query.originator = { $regex: req.query.originator, $options: 'i' }
    }

    //check if assignedTo is provided
    if (req.query.assignedTo && req.query.assignedTo !== '') {
        query.assignedTo = { $regex: req.query.assignedTo, $options: 'i' }
    }

    //check if validatedBy is provided
    if (req.query.validatedBy && req.query.validatedBy !== '') {
        query.validatedBy = { $regex: req.query.validatedBy, $options: 'i' }
    }

    //check if title is provided
    if (req.query.title && req.query.title !== '') {
        query.title = { $regex: req.query.title, $options: 'i' }
    }

    //check if description is provided
    if (req.query.description && req.query.description !== '') {
        query.description = { $regex: req.query.description, $options: 'i' }
    }

    //check if workPerformed is provided
    if (req.query.workPerformed && req.query.workPerformed !== '') {
        query.workPerformed = { $regex: req.query.workPerformed, $options: 'i' }
    }

    return query;
}
module.exports = getQuery