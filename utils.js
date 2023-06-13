exports.findYoungestPerson = (numbers) => {
    if (numbers.length === 0) {
      return null; // Return null for an empty array
    }
  
    let smallest = numbers[0]; // Assume the first number is the smallest
  
    for (let i = 1; i < numbers.length; i++) {
      if (numbers[i] < smallest) {
        smallest = numbers[i]; // Update the smallest number
      }
    }
  
    return smallest;
  }

exports.findOldestPerson = (numbers) => {
    if (numbers.length === 0) {
      return null; // Return null for an empty array
    }
  
    let largest = numbers[0]; // Assume the first number is the largest
  
    for (let i = 1; i < numbers.length; i++) {
      if (numbers[i] > largest) {
        largest = numbers[i]; // Update the largest number
      }
    }
  
    return largest;
  }

exports.favFood = (people, food) => {
    let count = 0
    people.map( person => {
        if(person.food.includes(food)){
            count++
        }
    })
    return count
}