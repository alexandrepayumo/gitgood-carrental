from django.test import TestCase
from .models import Branch
import math
import random

class TokenTestCase(TestCase):
    def setUp(self):
        # Create various branches
        self.branches = [
            Branch.objects.create(
                name="Montreal",
                address="Faubourg Building, 1230 Guy St, Montreal, Quebec H3G 2H4, Canada",
                geolocation="45.4950,-73.5780",
            ),
            Branch.objects.create(
                name="New York",
                address="350 5th Avenue, Suite 5945 Empire State Building, New York, NY 10118, United States",
                geolocation="40.7482,-73.9856",
            ),
            Branch.objects.create(
                name="San Francisco",
                address="450 10th St, San Francisco, CA 94103, United States",
                geolocation="37.7708,-122.4113",
            )
        ]
        
    def calculate_distance(self, location, branch):
        branch_location = [float(x) for x in branch.geolocation.split(',')]
        return math.hypot(branch_location[0] - location[0], branch_location[1] - location[1])

    def test_nearest_branch(self):
        # Set a target location near an existing branch
        target_branch = random.choice(self.branches)
        target_location = [float(x) for x in target_branch.geolocation.split(',')]
        target_location[0] += random.uniform(-1.5,1.5)
        target_location[1] += random.uniform(-1.5,1.5)
        
        # Get the closest branch
        closest_branch = self.branches[0]
        closest_branch_distance = self.calculate_distance(target_location, self.branches[0])
        for branch in self.branches:
            if branch == self.branches[0]:
                continue
            branch_distance = self.calculate_distance(target_location, branch)
            if branch_distance < closest_branch_distance:
                closest_branch = branch
                closest_branch_distance = branch_distance
              
        self.assertEqual(closest_branch, target_branch)