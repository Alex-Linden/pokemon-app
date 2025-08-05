import { Box, Typography, CircularProgress, Button } from "@mui/material";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";

export default function CatchingAnimation({ isCatching, result, onClose }) {
    const showOverlay = isCatching || result;

    return (
        <AnimatePresence>
            {showOverlay && (
                <motion.div
                    key="animation"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                        position: "fixed",
                        inset: 0,
                        backgroundColor: "rgba(0,0,0,0.6)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 9999,
                    }}
                >
                    <Box
                        textAlign="center"
                        bgcolor="background.paper"
                        p={4}
                        borderRadius={2}
                        boxShadow={5}
                        width={300}
                    >
                        {isCatching && (
                            <>
                                <motion.div
                                    animate={{
                                        rotate: [0, -15, 15, -10, 10, 0],
                                    }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 1.2,
                                    }}
                                >
                                    <CatchingPokemonIcon sx={{ fontSize: 80, color: "red" }} />
                                </motion.div>
                                <Typography variant="h6" mt={2}>
                                    Attempting to catch...
                                </Typography>
                            </>
                        )}

                        {!isCatching && result && (
                            <>
                                {result.success ? (
                                    <>
                                        <CheckCircleIcon color="success" sx={{ fontSize: 64 }} />
                                        <Typography
                                            variant="h6"
                                            mt={2}
                                            color="success.main"
                                        >
                                            {result.message || "Pokémon caught!"}
                                        </Typography>
                                    </>
                                ) : (
                                    <>
                                        <CancelIcon color="error" sx={{ fontSize: 64 }} />
                                        <Typography
                                            variant="h6"
                                            mt={2}
                                            color="error.main"
                                        >
                                            {result.message || "Oh no! It got away."}
                                        </Typography>
                                    </>
                                )}

                                <Button
                                    onClick={onClose}
                                    variant="contained"
                                    sx={{ mt: 3 }}
                                    fullWidth
                                >
                                    Close
                                </Button>
                            </>
                        )}
                    </Box>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
