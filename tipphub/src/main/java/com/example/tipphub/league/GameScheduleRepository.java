package com.example.tipphub.league;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameScheduleRepository extends JpaRepository<GameSchedule,Long> {
}
