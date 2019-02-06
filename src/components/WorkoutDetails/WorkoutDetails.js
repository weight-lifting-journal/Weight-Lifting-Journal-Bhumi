import React, { Component } from "react";
import { connect } from "react-redux";
import { getWorkouts } from "../../store/actions";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import NavBar from "../Header/NavBar";
import styled from "styled-components";

const Header = styled.div``;

const ExercisesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
const CardWrapper = styled.div`
  min-width: 300px;
  margin: 20px;
`;

class WorkoutDetails extends Component {
  componentDidMount() {
    this.props.getWorkouts();
  }

  render() {
    const workout = this.props.workouts.find(workout => {
      return `${workout.id}` === this.props.match.params.id;
    });

    if (!workout) {
      return null;
    }

    const { id, region, date } = workout;

    return (
      <div>
        <NavBar />
        <Header>
          <Typography gutterBottom variant="h4">
            {region}
          </Typography>
          <Typography gutterBottom variant="h6">
            {date}
          </Typography>
        </Header>
        <ExercisesWrapper>
          {this.props.exercises
            .filter(exercise => {
              return exercise.journalId === id;
            })
            .map((exercise, index) => {
              return (
                <CardWrapper key={index}>
                  <Card>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {exercise.name}
                      </Typography>
                      <hr />
                      <Typography component="p">
                        Weight: {exercise.weight}
                      </Typography>
                      <Typography component="p">
                        Sets: {exercise.sets}
                      </Typography>
                      <Typography component="p">
                        Reps: {exercise.reps}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary">
                        Edit
                      </Button>
                    </CardActions>
                  </Card>
                </CardWrapper>
              );
            })}
        </ExercisesWrapper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  workouts: state.workouts,
  exercises: state.exercises
});

export default connect(
  mapStateToProps,
  { getWorkouts }
)(WorkoutDetails);