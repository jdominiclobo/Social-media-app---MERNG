import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import PostCard from "../components/PostCard";

import { Grid } from "semantic-ui-react";

const FETCH_POSTS_QUERY = gql`
  query {
    getPosts {
      id
      username
      body
      createdAt
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        body
        createdAt
      }
    }
  }
`;

const Home = () => {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  console.log("did I get", data);

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h1>loading posts...</h1>
        ) : (
          data &&
          data.getPosts.map((post) => (
            <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
              <PostCard post={post} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
};

export default Home;
