# Problem: 88. Merge Sorted Array
# https://leetcode.com/problems/merge-sorted-array/
# Difficulty: Easy
# Topic: Arrays, Two Pointers

def merge(nums1, m, nums2, n):
    # Start filling from the end
    i = m - 1  # pointer for nums1
    j = n - 1  # pointer for nums2
    k = m + n - 1  # pointer for the last position in nums1

    while i >= 0 and j >= 0:
        if nums1[i] > nums2[j]:
            nums1[k] = nums1[i]
            i -= 1
        else:
            nums1[k] = nums2[j]
            j -= 1
        k -= 1

    # If any elements are left in nums2
    while j >= 0:
        nums1[k] = nums2[j]
        j -= 1
        k -= 1

# Test case
nums1 = [1,2,3,0,0,0]
m = 3
nums2 = [2,5,6]
n = 3
merge(nums1, m, nums2, n)
print(nums1)  # Output: [1,2,2,3,5,6]
