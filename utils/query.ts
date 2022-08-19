export function generateWhereStatement(obj: any) {
	let query = "WHERE ";
	let count = 0;
	for (let item in obj) {
		if (count === 0) {
			query += `${item} = ${obj[item]}`;
		} else {
			query += `AND ${item} = ${obj[item]}`;
		}
	}
	return query;
}
