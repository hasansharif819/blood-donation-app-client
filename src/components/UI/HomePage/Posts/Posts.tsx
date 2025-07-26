/* eslint-disable @next/next/no-img-element */
"use client";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Avatar,
  Button,
  Divider,
  Stack,
  TextField,
  IconButton,
  Collapse,
  Badge,
  useTheme,
  CircularProgress,
  Alert,
  Grid,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import {
  Comment,
  ThumbUp,
  ExpandMore,
  ExpandLess,
  CheckCircle,
  LocalHospital,
  LocationOn,
  Bloodtype,
  Event,
  Schedule,
  Reply,
  Visibility,
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import useUserInfo from "@/hooks/useUserInfo";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useGetAllPostsQuery } from "@/redux/api/postApi";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface CommentType {
  id: string;
  user: User;
  content: string;
  image?: string;
  createdAt: string;
  replies?: CommentType[];
}

interface Approval {
  user: User;
}

interface Post {
  id: string;
  userId: string;
  bloodType: string;
  numberOfBags: number;
  dateOfDonation: string;
  donationTime: string;
  hospitalName: string;
  hospitalAddress: string;
  city: string;
  reason: string;
  postStatus: string;
  isManaged: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  user: User;
  approvals: Approval[];
  comments?: CommentType[];
}

interface PostsResponse {
  data: Post[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

const DonationPosts = () => {
  const theme = useTheme();
  const router = useRouter();
  const userInfo = useUserInfo();
  const [expandedPosts, setExpandedPosts] = useState<Record<string, boolean>>(
    {}
  );
  const [showComments, setShowComments] = useState<Record<string, boolean>>({});
  const [commentTexts, setCommentTexts] = useState<Record<string, string>>({});
  const [replyTexts, setReplyTexts] = useState<
    Record<string, Record<string, string>>
  >({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  });
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [commentsDialogOpen, setCommentsDialogOpen] = useState(false);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [postComments, setPostComments] = useState<CommentType[]>([]);

  const { data, isLoading } = useGetAllPostsQuery({});
  const posts = data?.donors || [];

  console.log("Posts Data:", posts);

  const getToken = Cookies.get("accessToken");

  const fetchComments = async (postId: string) => {
    try {
      setCommentsLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/comments/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch comments");
      }

      const data = await res.json();
      setPostComments(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch comments");
    } finally {
      setCommentsLoading(false);
    }
  };

  const handleApprove = async (postId: string) => {
    // try {
    //   if (!userInfo?.userId) {
    //     throw new Error("User not authenticated");
    //   }
    //   const res = await fetch(
    //     `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/post-approvals/create`,
    //     {
    //       method: "POST",
    //       headers: {
    //         Authorization: `Bearer ${getToken}`,
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         userId: userInfo.userId,
    //         postId: postId,
    //       }),
    //     }
    //   );
    //   if (!res.ok) {
    //     throw new Error("Failed to approve post");
    //   }
    //   // Update the post in the state
    //   setPosts((prev) =>
    //     prev.map((post) => {
    //       if (post.id === postId) {
    //         return {
    //           ...post,
    //           approvals: [
    //             ...post.approvals,
    //             {
    //               user: {
    //                 id: userInfo.userId,
    //                 name: userInfo.name,
    //                 email: userInfo.email,
    //               },
    //             },
    //           ],
    //         };
    //       }
    //       return post;
    //     })
    //   );
    // } catch (err) {
    //   setError(err instanceof Error ? err.message : "Failed to approve post");
    // }
  };

  const toggleExpand = (postId: string) => {
    setExpandedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleCommentChange = (postId: string, text: string) => {
    setCommentTexts((prev) => ({
      ...prev,
      [postId]: text,
    }));
  };

  const handleReplyChange = (
    postId: string,
    commentId: string,
    text: string
  ) => {
    setReplyTexts((prev) => ({
      ...prev,
      [postId]: {
        ...(prev[postId] || {}),
        [commentId]: text,
      },
    }));
  };

  const handleAddComment = async (postId: string) => {
    // try {
    //   if (!userInfo?.userId) {
    //     throw new Error("User not authenticated");
    //   }
    //   const res = await fetch(
    //     `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/comments/create`,
    //     {
    //       method: "POST",
    //       headers: {
    //         Authorization: `Bearer ${getToken}`,
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         userId: userInfo.userId,
    //         postId: postId,
    //         content: commentTexts[postId],
    //         image: "", // You can add image upload functionality here
    //       }),
    //     }
    //   );
    //   if (!res.ok) {
    //     throw new Error("Failed to add comment");
    //   }
    //   const newComment = await res.json();
    //   if (commentsDialogOpen) {
    //     setPostComments((prev) => [...prev, newComment]);
    //   } else {
    //     setPosts((prev) =>
    //       prev.map((post) => {
    //         if (post.id === postId) {
    //           return {
    //             ...post,
    //             comments: [...(post.comments || []), newComment],
    //           };
    //         }
    //         return post;
    //       })
    //     );
    //   }
    //   handleCommentChange(postId, "");
    // } catch (err) {
    //   setError(err instanceof Error ? err.message : "Failed to add comment");
    // }
  };

  const handleAddReply = async (postId: string, commentId: string) => {
    try {
      if (!userInfo?.userId) {
        throw new Error("User not authenticated");
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/comments/create`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${getToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userInfo.userId,
            postId: postId,
            content: replyTexts[postId]?.[commentId],
            image: "", // You can add image upload functionality here
            parentId: commentId,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to add reply");
      }

      const newReply = await res.json();

      if (commentsDialogOpen) {
        setPostComments((prev) =>
          prev.map((comment) => {
            if (comment.id === commentId) {
              return {
                ...comment,
                replies: [...(comment.replies || []), newReply],
              };
            }
            return comment;
          })
        );
      } else {
        // setPosts((prev) =>
        //   prev.map((post) => {
        //     if (post.id === postId) {
        //       return {
        //         ...post,
        //         comments: post.comments?.map((comment) => {
        //           if (comment.id === commentId) {
        //             return {
        //               ...comment,
        //               replies: [...(comment.replies || []), newReply],
        //             };
        //           }
        //           return comment;
        //         }),
        //       };
        //     }
        //     return post;
        //   })
        // );
      }

      handleReplyChange(postId, commentId, "");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add reply");
    }
  };

  const handleOpenCommentsDialog = (post: Post) => {
    setSelectedPost(post);
    setCommentsDialogOpen(true);
    fetchComments(post.id);
  };

  const handleCloseCommentsDialog = () => {
    setCommentsDialogOpen(false);
    setSelectedPost(null);
    setPostComments([]);
  };

  const handleViewDetails = (postId: string) => {
    router.push(`/posts/${postId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "warning";
      case "APPROVED":
        return "success";
      case "REJECTED":
        return "error";
      default:
        return "default";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const renderDetailItem = (
    icon: React.ReactNode,
    label: string,
    value: string
  ) => (
    <Stack direction="row" spacing={1} alignItems="center">
      <Box sx={{ color: theme.palette.text.secondary }}>{icon}</Box>
      <Typography variant="body2">
        <Typography component="span" fontWeight={600}>
          {label}:{" "}
        </Typography>
        {value}
      </Typography>
    </Stack>
  );

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ maxWidth: 800, mx: "auto", py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Blood Donation Requests
      </Typography>
      <Typography color="text.secondary" mb={4}>
        {data?.meta?.total} requests found
      </Typography>

      {posts.length === 0 ? (
        <Typography variant="body1" textAlign="center" color="text.secondary">
          No donation requests found
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {posts?.map((post: any) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 2,
                  boxShadow: theme.shadows[2],
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    <Avatar
                      sx={{ width: 56, height: 56 }}
                      alt={post.user.name}
                      src={post.user.avatar}
                    >
                      {post.user.name.charAt(0)}
                    </Avatar>

                    <Box sx={{ flex: 1 }}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={1}
                      >
                        <Typography fontWeight={600} fontSize={24}>
                          {post.user.name}
                        </Typography>
                        <Chip
                          label={post.postStatus}
                          color={getStatusColor(post.postStatus)}
                          size="small"
                          sx={{ fontWeight: 500 }}
                        />
                      </Stack>

                      <Typography variant="body2" color="text.secondary" mb={2}>
                        {formatDate(post.createdAt)}
                      </Typography>

                      <Stack spacing={1.5} mb={2}>
                        {renderDetailItem(
                          <Bloodtype />,
                          "Blood Type",
                          post.bloodType.replace("_", " ")
                        )}
                        {renderDetailItem(
                          <LocalHospital />,
                          "Hospital",
                          post.hospitalName
                        )}
                        {renderDetailItem(
                          <LocalHospital />,
                          "Number of Bags",
                          post.numberOfBags
                        )}
                        {renderDetailItem(
                          <LocationOn />,
                          "Location",
                          post.city
                        )}
                        {renderDetailItem(
                          <LocationOn />,
                          "Reason",
                          post.reason
                        )}
                      </Stack>

                      {/* <Collapse in={expandedPosts[post.id]} collapsedSize={60}>
                        <Typography variant="body2" paragraph>
                          <Typography component="span" fontWeight={600}>
                            Reason:{" "}
                          </Typography>
                          {post.reason}
                        </Typography>
                      </Collapse> */}

                      {/* <Button
                        size="small"
                        onClick={() => toggleExpand(post.id)}
                        endIcon={
                          expandedPosts[post.id] ? (
                            <ExpandLess />
                          ) : (
                            <ExpandMore />
                          )
                        }
                      >
                        {expandedPosts[post.id] ? "Show Less" : "Read More"}
                      </Button> */}
                    </Box>
                  </Stack>
                </CardContent>

                <Box sx={{ p: 2 }}>
                  <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="space-between"
                  >
                    <Button
                      variant="contained"
                      color="success"
                      startIcon={<CheckCircle />}
                      onClick={() => handleApprove(post.id)}
                      size="small"
                      disabled={post.postStatus === "APPROVED"}
                      sx={{ flex: 1 }}
                    >
                      Approve ({post.approvals.length})
                    </Button>

                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<Comment />}
                      onClick={() => handleOpenCommentsDialog(post)}
                      size="small"
                      sx={{ flex: 1 }}
                    >
                      Comments ({post.comments?.length || 0})
                    </Button>

                    <Button
                      variant="contained"
                      color="info"
                      startIcon={<Visibility />}
                      onClick={() => handleViewDetails(post.id)}
                      size="small"
                      sx={{ flex: 1 }}
                    >
                      Details
                    </Button>
                  </Stack>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Comments Dialog */}
      <Dialog
        open={commentsDialogOpen}
        onClose={handleCloseCommentsDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Comments for {selectedPost?.user.name}s post</DialogTitle>
        <DialogContent dividers>
          {commentsLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Box sx={{ maxHeight: "60vh", overflowY: "auto", p: 1 }}>
              {postComments.length === 0 ? (
                <Typography color="text.secondary" textAlign="center">
                  No comments yet
                </Typography>
              ) : (
                <Stack spacing={3}>
                  {postComments.map((comment) => (
                    <Box key={comment.id}>
                      <Stack
                        direction="row"
                        spacing={2}
                        alignItems="flex-start"
                      >
                        <Avatar
                          sx={{ width: 40, height: 40 }}
                          alt={comment.user.name}
                          src={comment.user.avatar}
                        >
                          {comment.user.name.charAt(0)}
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                            mb={0.5}
                          >
                            <Typography fontWeight={600}>
                              {comment.user.name}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {formatDate(comment.createdAt)}
                            </Typography>
                          </Stack>
                          <Typography variant="body2">
                            {comment.content}
                          </Typography>
                          {comment.image && (
                            <Box mt={1}>
                              <img
                                src={comment.image}
                                alt="Comment attachment"
                                style={{
                                  maxWidth: "100%",
                                  borderRadius: theme.shape.borderRadius,
                                }}
                              />
                            </Box>
                          )}

                          <Stack direction="row" spacing={1} mt={1}>
                            <IconButton size="small">
                              <Reply fontSize="small" />
                            </IconButton>
                          </Stack>

                          {/* Replies */}
                          {comment.replies?.map((reply) => (
                            <Box
                              key={reply.id}
                              sx={{
                                pl: 2,
                                mt: 2,
                                borderLeft: `2px solid ${theme.palette.divider}`,
                              }}
                            >
                              <Stack
                                direction="row"
                                spacing={2}
                                alignItems="flex-start"
                              >
                                <Avatar
                                  sx={{ width: 32, height: 32 }}
                                  alt={reply.user.name}
                                  src={reply.user.avatar}
                                >
                                  {reply.user.name.charAt(0)}
                                </Avatar>
                                <Box sx={{ flex: 1 }}>
                                  <Stack
                                    direction="row"
                                    spacing={1}
                                    alignItems="center"
                                    mb={0.5}
                                  >
                                    <Typography
                                      variant="body2"
                                      fontWeight={600}
                                    >
                                      {reply.user.name}
                                    </Typography>
                                    <Typography
                                      variant="caption"
                                      color="text.secondary"
                                    >
                                      {formatDate(reply.createdAt)}
                                    </Typography>
                                  </Stack>
                                  <Typography variant="body2">
                                    {reply.content}
                                  </Typography>
                                  {reply.image && (
                                    <Box mt={1}>
                                      <img
                                        src={reply.image}
                                        alt="Reply attachment"
                                        style={{
                                          maxWidth: "100%",
                                          borderRadius:
                                            theme.shape.borderRadius,
                                        }}
                                      />
                                    </Box>
                                  )}
                                </Box>
                              </Stack>
                            </Box>
                          ))}

                          {/* Reply input */}
                          <Stack direction="row" spacing={1} mt={2}>
                            <TextField
                              size="small"
                              fullWidth
                              placeholder="Write a reply..."
                              value={
                                replyTexts[selectedPost?.id || ""]?.[
                                  comment.id
                                ] || ""
                              }
                              onChange={(e) =>
                                handleReplyChange(
                                  selectedPost?.id || "",
                                  comment.id,
                                  e.target.value
                                )
                              }
                            />
                            <Button
                              variant="contained"
                              onClick={() =>
                                handleAddReply(
                                  selectedPost?.id || "",
                                  comment.id
                                )
                              }
                              disabled={
                                !replyTexts[selectedPost?.id || ""]?.[
                                  comment.id
                                ]
                              }
                            >
                              Reply
                            </Button>
                          </Stack>
                        </Box>
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              )}
            </Box>
          )}
        </DialogContent>
        <Box sx={{ p: 2 }}>
          <Stack direction="row" spacing={1}>
            <TextField
              fullWidth
              placeholder="Add a comment..."
              value={commentTexts[selectedPost?.id || ""] || ""}
              onChange={(e) =>
                handleCommentChange(selectedPost?.id || "", e.target.value)
              }
              multiline
              rows={2}
            />
            <Button
              variant="contained"
              onClick={() => handleAddComment(selectedPost?.id || "")}
              disabled={!commentTexts[selectedPost?.id || ""]}
              sx={{ alignSelf: "flex-end" }}
            >
              Post
            </Button>
          </Stack>
        </Box>
        <DialogActions>
          <Button onClick={handleCloseCommentsDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DonationPosts;
