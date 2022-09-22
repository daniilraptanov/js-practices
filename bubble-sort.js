function customBubbleSort(data=[], isAsc=true) {
    let isCompleted = false;

    while (!isCompleted) {
        let isDataChange = false;

        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            const nextElement = data[index + 1];

            if (isAsc ? (element > nextElement) : (element < nextElement)) {
                data[index] = nextElement;
                data[index + 1] = element;
                isDataChange = true;
            }
        }
        if (!isDataChange) {
            isCompleted = true;
        }
    }

    return data;
};

const testData = [5, 1, 4, 2, 8];

console.log(customBubbleSort(testData, false));
