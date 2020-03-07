let metric,
	imperial;

metric = {
    mm: {
        ratio: 1 // mm
    },
    cm: {
	 	ratio: 10 // cm * mm
	    },
	m: {
	    ratio: 1 * 100 * 10  // m * cm * mm
	},
	km: {
	    ratio: 1 * 1000 * 100 * 10 // km * m * cm * mm
	}
}

export const length = {
	metric,
	imperial
}
