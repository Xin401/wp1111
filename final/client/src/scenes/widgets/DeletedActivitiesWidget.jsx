import { Box, Typography, useTheme, Button, Divider, Modal } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setParticipation } from "state";
import { useState } from 'react';
import ActivityWidget from "./ActivityWidget";
import api from '../../../src/connection'

const DeletedActivities = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const [activities, setActivities] = useState([]);
  const [openModal, setOpenModal] = useState(false)
  const [modalAct, setModalAct] = useState(null)
  const [editOpen, setEditOpen] = useState(false)
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const getActivities = useCallback(async () => {
    console.log("getting activities");
    const response = await fetch(`${api}/activities/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    const newActivities = data.filter(activity=>activity.deleted&&activity.host === userId);
    
    setActivities(newActivities);
    
  });



  useEffect(() => {
    getActivities()
  }, [activities]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper sx={{ boxShadow: 1 }}>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1rem" }}
        align="center"
      >
        Deleted Activities
      </Typography>
      <Divider></Divider>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {activities.map((p, i) => {
          
          return (
            <Button variant="text" key={p.heading + i + 'button'} color="inherit" onClick={() => {
              setOpenModal(!openModal)
              setModalAct(p)
            }}>
              <Box key={p.heading + i+i} gap="1rem">
                <Typography key={p.heading + i} fontWeight="bold" variant="h6">
                  {p.heading}
                </Typography>
                <Typography key={p.heading + i+i+i}>hosted by {p.name}.</Typography>
              </Box>
            </Button>
          );
        })}
      </Box>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ overflow: 'scroll', width: '50%', mx: '25%' }}

      >
        {modalAct ?
          <ActivityWidget
            key={modalAct._id}
            activityId={modalAct._id}
            activityUserId={modalAct.host}
            name={modalAct.name}
            description={modalAct.description}
            participants={modalAct.participants}
            department={modalAct.department}
            picturePath={modalAct.picturePath}
            userPicturePath={modalAct.userPicturePath}
            join={modalAct.join}
            comments={modalAct.comments}
            tags={modalAct.tags}
            date={modalAct.date}
            friendOnly={modalAct.friendOnly}
            heading={modalAct.heading}
            limit={modalAct.limit}
            editOpen={editOpen}
            setEditOpen={setEditOpen}
            deleted={modalAct.deleted}
          /> : <></>}
      </Modal>
    </WidgetWrapper >
  );
};

export default DeletedActivities;

