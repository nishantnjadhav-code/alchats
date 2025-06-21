# Problem: 27. Remove Element
# https://leetcode.com/problems/remove-element/
# Difficulty: Easy
# Topic: Arrays, Two Pointers

def removeElement(nums, val):
    k = 0
    for i in range(len(nums)):
        if nums[i] != val:
            nums[k] = nums[i]
            k += 1
    return k
