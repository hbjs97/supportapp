import {
  Backdrop,
  Box,
  Container,
  Fade,
  InputAdornment,
  Modal,
  Pagination,
  SvgIcon,
  TextField,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Search as SearchIcon } from "src/icons/search";
import { RequestKakaoAddressApi } from "src/utils/fetch-api";
import { AddressListResults } from "./address-list.results";

const AddressGeo = (props) => {
  const { isOpen, onClose, onClick } = props;
  const [query, setQuery] = useState(" ");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(0);
  const [addresses, setAddresses] = useState([]);

  const searchAddress = useCallback(async () => {
    const { data, config } = await RequestKakaoAddressApi(query, page);
    if (config.status !== 200) {
      alert("카카오 주소검색 API 호출 실패");
      return;
    }
    setAddresses(data);
    setSize(config.pageable_count);
  }, [page, query]);

  const handleChangeQuery = useCallback(
    (event) => {
      setQuery(event.target.value);
    },
    [query]
  );

  const handleChangePage = useCallback(
    (event, newPage) => {
      if (newPage) setPage(newPage);
    },
    [page]
  );

  useEffect(() => {
    searchAddress();
  }, [page]);

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 100,
      }}
    >
      <Fade in={isOpen}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "800px",
            maxHeight: "80vh",
            bgcolor: "white",
            border: "1px solid rgba(0,0,0,0.2)",
            borderRadius: "3px",
            boxShadow: "5",
            margin: "15px",
            outline: "none",
          }}
        >
          <Container maxWidth sx={{ padding: "24px" }}>
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon color="action" fontSize="small">
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                ),
              }}
              onChange={handleChangeQuery}
              onKeyDown={(e) => e.key == "Enter" && searchAddress()}
              placeholder="Search address"
              variant="outlined"
            />
            <Box sx={{ mt: 3 }}>
              <AddressListResults addresses={addresses} onClick={onClick} />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                pt: 3,
              }}
            >
              <Pagination
                color="primary"
                count={Math.ceil(size / 10) || 1}
                page={page}
                size="small"
                onChange={handleChangePage}
              />
            </Box>
          </Container>
        </Box>
      </Fade>
    </Modal>
  );
};

export default AddressGeo;
