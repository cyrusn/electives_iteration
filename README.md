# overall rank

- find standard score of each subjects. Get the weighted mean of all subjects, then rank all students

# combination rank

- find standard score of each subjects. Get the weighted mean (with different weighting given by subject panal) of all subjects, take the average of the weighted mean of two subjects in combination, then rank the student.

# Step

## Allocation

1. The combination quota (min of two subjects) is the cutoff line of the combination. Assign the combination to the first student who's first choice is in the cutoff line (order by combination rank and overall rank).
2. if fail to find student in step 1, assign the first combination to the student who is first in overall ranking

## Cleanup

1. after the assignment, remove the student from combination and overall ranking list.

# Requirement

- allocate one student to a combination for each iteration
- print out each allocation
