class ReservationManager():
    def create_reservation(self, vehicle, user=None, **extra_fields):
        if not vehicle:
            raise ValueError('The Vehicle field must be set')
        reservation = self.model(user, **extra_fields)
        reservation.save(using=self._db)
        return reservation
