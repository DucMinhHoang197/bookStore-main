import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Button,
  Alert,
  Box,
  Card,
  Stack,
  CardMedia,
  CardActionArea,
  Typography,
  CardContent,
} from "@mui/material";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import api from "../apiService";
import { removeFavorite, getFavorites } from "../service/slice";

const BACKEND_API = process.env.REACT_APP_BACKEND_API;

const ReadingPage = () => {
  const dispatch = useDispatch();
  const favoriteBookList = useSelector((state) => state.book.favoriteBookList);
  const errorMessage = useSelector((state) => state.book.errorMessage);
  const isloading = useSelector((state) => state.book.isLoading);
  const navigate = useNavigate();

  const handleClickBook = (bookId) => {
    navigate(`/books/${bookId}`);
  };

  const removeBook = async (bookId) => {
    await dispatch(removeFavorite(bookId));
    // await dispatch(getFavorites());
  };

  useEffect(() => {
    dispatch(getFavorites());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favoriteBookList]);
  return (
    <Container>
      <Typography variant="h3" sx={{ textAlign: "center" }} m={3}>
        Book Store
      </Typography>
      {errorMessage && <Alert severity="danger">{errorMessage}</Alert>}

      {isloading ? (
        <Box sx={{ textAlign: "center", color: "primary.main" }}>
          <ClipLoader color="inherit" size={150} loading={true} />
        </Box>
      ) : (
        <Stack
          direction="row"
          spacing={2}
          justifyContent="space-around"
          flexWrap={"wrap"}
        >
          {favoriteBookList.map((book) => (
            <Card
              key={book.id}
              sx={{
                width: "12rem",
                height: "27rem",
                marginBottom: "2rem",
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={`${BACKEND_API}/${book.imageLink}`}
                  alt={`${book.title}`}
                  onClick={() => handleClickBook(book.id)}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {`${book.title}`}
                  </Typography>
                  <Typography gutterBottom variant="body1" component="div">
                    {`${book.author}`}
                  </Typography>
                  <Button
                    sx={{
                      position: "absolute",
                      top: "5px",
                      right: "5px",
                      backgroundColor: "secondary.light",
                      color: "secondary.contrastText",
                      padding: "0",
                      minWidth: "1.5rem",
                    }}
                    size="small"
                    onClick={() => removeBook(book.id)}
                  >
                    &times;
                  </Button>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Stack>
      )}
    </Container>
  );
};

export default ReadingPage;
