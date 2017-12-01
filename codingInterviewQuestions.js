// Binary Search
function binarySearch(nums, target) {
  let low = 0
  let high = nums.length - 1
  while (low <= high) {
    let middle = Math.floor((low + high) / 2)
    if (nums[middle] === target) return middle
    else if (nums[middle] > target) high = middle - 1
    else low = middle + 1
  }
  return -1
}

// Merge 2 sorted arrays
// https://leetcode.com/problems/merge-sorted-array
function merge2sorted(A, B) {
  let i = A.length - 1
  let j = B.length - 1
  let k = A.length + B.length - 1
  while (i >= 0 && j >= 0) {
    A[k--] = A[i] > B[j] ? A[i--] : B[j--]
  }
  while (j >= 0) {
    A[k--] = B[j--]
  }
  return A
}

// Maximum Subarray
// https://leetcode.com/problems/maximum-subarray/description/
function maxSubArray(nums) {
  const dp = []
  dp[0] = nums[0]
  let max = dp[0]

  for (let i = 1; i < nums.length; i++) {
    dp[i] = nums[i] + (dp[i - 1] > 0 ? dp[i - 1] : 0)
    max = Math.max(dp[i], max)
  }
  return max
}

// Degree of an Array, Find shortest subarray 
// https://leetcode.com/problems/degree-of-an-array/description/
function findShortestSubArray(nums) {
  if (nums.length === 0) return 0
  const count = {}
  const starts = {}
  const ends = {}
  let max = 0
  nums.forEach((num, i) => {
    if (!count.hasOwnProperty(num)) {
      count[num] = 0
      starts[num] = i
    }
    count[num] = count[num] + 1
    ends[num] = i
    max = Math.max(max, count[num])
  })
  let ans = Number.MAX_VALUE
  for (let num of nums) {
    if (count[num] === max)
      ans = Math.min(ans, ends[num] - starts[num] + 1)
  }
  return ans
}

// Pascal's Triangle
// https://leetcode.com/problems/pascals-triangle/description/
function pascalsTriangle(numRows) {
  const ans = []
  if (numRows === 0) return ans
  if (numRows >= 1) ans.push([1])
  if (numRows >= 2) ans.push([1, 1])
  let j = 1
  while (ans.length < numRows) {
      const newRow = []
      newRow.push(1)
      for (let i = 0; i < j; i++) {
          newRow.push(ans[j][i] + ans[j][i + 1])
      }
      newRow.push(1)
      ans.push(newRow)
      j++
  }
  return ans
}

// Average of Levels in Binary Tree
// https://leetcode.com/problems/average-of-levels-in-binary-tree/discuss/
function averageOfLevels(root) {
  const average = []
  const calculate = (node, deepLevel) => {
    if (!node) return null
    if (!average[deepLevel]) {
      average[deepLevel] = {
        val: 0,
        childrenCount: 0
      }
    }
    average[deepLevel].val = average[deepLevel].val + node.val
    average[deepLevel].childrenCount = average[deepLevel].childrenCount + 1
    calculate(node.right, deepLevel + 1)
    calculate(node.left, deepLevel + 1)
  }
  calculate(root, 0)
  return average.map(obj => obj.val / obj.childrenCount)
}

// 05.11.2017
// Next Greater Element I
// https://leetcode.com/problems/next-greater-element-i/description/
function nextGreaterElement(nums1, nums2) {
  const hash = {}
  const ans = []
  nums2.forEach((num, index) => hash[num] = index)
  for (let i = 0; i < nums1.length; i++) {
    let currIndex = hash[nums1[i]]
    let hasFound = false
    for (let e = currIndex + 1; e < nums2.length; e++) {
      if (nums2[e] > nums1[i]) {
        ans.push(nums2[e])
        hasFound = true
        break
      }
    }
    if (!hasFound) ans.push(-1)
  }
  return ans
}

// 05.11.2017
// Fizz Buzz
// https://leetcode.com/problems/fizz-buzz/description/
function fizzBuzz(n) {
  const ans = []
  for (let i = 1; i <= n; i++) {
    let addition = ''
    if (i % 3 === 0) addition += 'Fizz'
    if (i % 5 === 0) addition += 'Buzz'
    ans.push(addition.length === 0 ? i.toString() : addition) 
  }
  return ans
}

// 05.11.2017
// Maximum Depth of Binary Tree
// https://leetcode.com/problems/maximum-depth-of-binary-tree/description/
function maxDepthBinaryTree(root) {
  let depth = 0
  function calculate(node, level = 1) {
    if (!node) return null
    depth = Math.max(depth, level)
    calculate(node.left, level + 1)
    calculate(node.right, level + 1)
  }
  calculate(root)
  return depth
}

// 05.11.2017
// Single Number
// https://leetcode.com/problems/single-number/description/
function singleNumber(nums) {
  const hash = {}
  nums.forEach(num => hash[num] = hash[num] ? hash[num] + 1 : 1)
  for (let elem in hash) {
    if (hash[elem] === 1) return Number(elem)
  }
}

// 05.11.2017
// Binary Number with Alternating Bits
// https://leetcode.com/problems/binary-number-with-alternating-bits/description/
function hasAlternatingBits(num) {
  return !Boolean(Number(num).toString(2).match(/11|00/ig))
}

// 05.11.2017
// Invert Binary Tree
// https://leetcode.com/problems/invert-binary-tree/description/
function invertTree(root) {
  if (root) {
    let left = root.left
    let right = root.right
    root.left = invertTree(right)
    root.right = invertTree(left)
  }
  return root
}

// 05.11.2017
// Add Digits
// https://leetcode.com/problems/add-digits/description/
function addDigits(num) {
  let arr = Number(num).toString().split('').map(el => Number(el))
    while (arr.length !== 1) {
        arr = arr.reduce((sum, el) => sum + el, 0).toString().split('').map(el => Number(el))
    }
    return Number(arr[0])
}

// 05.11.2017
// Intersection of Two Arrays
// https://leetcode.com/problems/intersection-of-two-arrays/description/
function intersection1(nums1, nums2) {
  const set1 = [...new Set(nums1)]
  const set2 = [...new Set(nums2)]
  return set1.filter(el => set2.indexOf(el) > -1)
}

// 05.11.2017
// Intersection of Two Arrays II
// https://leetcode.com/problems/intersection-of-two-arrays-ii/description/
function intersection2(nums1, nums2) {
  const hash1 = {}
  const hash2 = {}
  nums1.forEach(num => hash1[num] = hash1[num] ? hash1[num] + 1 : 1)
  nums2.forEach(num => hash2[num] = hash2[num] ? hash2[num] + 1 : 1)
  const ans = []
  for (let num in hash1) {
    if (!hash2[num]) continue
    let times = Math.min(hash1[num], hash2[num])
    while (times-- > 0) {
      ans.push(Number(num))
    }
  }
  return ans
}

// 05.11.2017
// Two Sum IV - Input is a BST
// https://leetcode.com/problems/two-sum-iv-input-is-a-bst/description/
function findTarget(root, k) {
  const hash = {}
  let ans = false
  function calculate(node) {
    if (!node || ans) return null
    if (hash.hasOwnProperty(node.val)) ans = true
    hash[k - node.val] = 1
    calculate(node.right)
    calculate(node.left)
  }
  calculate(root)
  return ans
}

// 05.11.2017
// Find All Numbers Disappeared in an Array
// https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/description/
function findDisappearedNumbers(nums) {
  const hash = {}
  nums.forEach(num => hash[num] = 1)
  const ans = []
  for (let i = 1; i <= nums.length; i++) {
    if (hash.hasOwnProperty(i)) continue
    ans.push(i)
  }
  return ans
}

// 30.11.2017
// Find the Difference
// https://leetcode.com/problems/find-the-difference/description/
function findTheDifference(s, t) {
  const hash1 = {}
  const hash2 = {}
  for (let i = 0; i < s.length; i++) {
    hash1[s[i]] = hash1[s[i]] ? hash1[s[i]] + 1 : 1
  }
  for (let i = 0; i < t.length; i++) {
    hash2[t[i]] = hash2[t[i]] ? hash2[t[i]] + 1 : 1
  }
  for (let char in hash2) {
    if (hash1.hasOwnProperty(char)) {
      if (hash1[char] < hash2[char]) {
        return char
      }
    } else {
      return char
    }
  }
}

// 30.11.2017
// Construct String from Binary Tree
// https://leetcode.com/problems/construct-string-from-binary-tree/description/
function tree2str(t) {
  if (t) {
    if (!t.left && t.right) {
      return t.val + `()(${tree2str(t.right)})`
    }
    return t.val +
      (t.left ? `(${tree2str(t.left)})` : '') +
      (t.right ? `(${tree2str(t.right)})` : '')
  } else {
    return ''
  }
}

// 30.11.2017
// Sum of Left Leaves
// https://leetcode.com/problems/sum-of-left-leaves/description/
function sumOfLeftLeaves(root) {
  let count = 0
  function innerWrapper(node) {
    if (!node) return
    if (node.left !== null && node.left.left === null && node.left.right === null) {
      count += node.left.val
    }
    innerWrapper(node.left)
    innerWrapper(node.right)
  }
  innerWrapper(root)
  return count
}