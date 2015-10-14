def powerset(a):
    # returns a list of all subsets of the list a
    if (len(a) == 0):
        return [[]]
    else:
        allSubsets = [ ]
        for subset in powerset(a[:len(a)-1]):
            allSubsets += [subset]
            allSubsets += [[a[len(a)-1]] + subset]
        return allSubsets

print powerset([1,2,3])
