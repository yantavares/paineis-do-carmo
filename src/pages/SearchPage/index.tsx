// SearchPageRefactored.tsx
import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import Item from "src/components/Item";
import SearchBar from "src/components/SearchBar";
import colors from "src/utils/colors";
import { capitalize, translateTopicType } from "src/utils/strings";
import ChurchMap from "./ChurchMap";
import TopicSearch from "./TopicSearch";
import {
  SearchBarContainer,
  SearchContainer,
  SearchHeader,
  SearchResult,
  SearchResultsContainer,
} from "./styles";
import { CircularProgress } from "@mui/material";
import {
  SearchContainerMobile,
  SearchHeaderMobile,
  SearchResultMobile,
} from "./stylesMobile";
import {
  faArrowUpAZ,
  faCircleArrowDown,
  faCircleArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/* --------------------------- utility functions -------------------------- */
const normalize = (s: string) => (s || "").toLowerCase();

const translateSelected = (selected: string) => {
  switch (selected) {
    case "artifices":
      return "artisans";
    case "obras":
      return "paintings";
    case "igrejas":
      return "churches";
    case "topicos":
      return "tags";
    default:
      return "";
  }
};

const sortArray = (
  arr: any[],
  criterion: "name" | "date",
  direction: "asc" | "desc"
) => {
  const dirFactor = direction === "asc" ? 1 : -1;
  const compareString = (a: string, b: string) =>
    dirFactor * a.localeCompare(b);
  const compareDate = (a: number, b: number) => dirFactor * (a - b);

  return [...arr].sort((a, b) => {
    if (criterion === "name") {
      return compareString(a.title || a.name, b.title || b.name);
    }
    const extractDate = (x: any) =>
      new Date(x.submittedAt || x.createdAt || x.uploadedAt || 0).getTime();
    return compareDate(extractDate(a), extractDate(b));
  });
};

/* ------------------------------ hooks ----------------------------------- */
const useIsMobile = (breakpoint = 860) => {
  const [isMobile, setIsMobile] = useState(
    () => window.innerWidth <= breakpoint
  );
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= breakpoint);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);
  return isMobile;
};

/* --------------------------- SortControl --------------------------- */
interface SortControlProps {
  show: boolean;
  toggle: () => void;
  criterion: "name" | "date";
  direction: "asc" | "desc";
  onChooseCriterion: (criterion: "name" | "date") => void;
}

export const SortControl: React.FC<SortControlProps> = React.memo(
  ({ show, toggle, criterion, direction, onChooseCriterion }) => {
    const ref = useRef<HTMLDivElement>(null);

    // close on outside click or ESC
    useEffect(() => {
      if (!show) return;
      const handleClickOutside = (e: MouseEvent) => {
        if (ref.current && !ref.current.contains(e.target as Node)) toggle();
      };
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") toggle();
      };
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEsc);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleEsc);
      };
    }, [show, toggle]);

    return (
      <div ref={ref} style={{ position: "relative" }}>
        <button
          aria-label="Sort"
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            marginTop: "3.8rem",
            outline: "none",
          }}
          onClick={toggle}
        >
          <FontAwesomeIcon
            icon={faArrowUpAZ}
            size="xl"
            color={show ? colors.mainColor : colors.black}
          />
        </button>
        {show && (
          <div
            style={{
              position: "absolute",
              right: 0,
              top: "-5rem",
              marginTop: "0.5rem",
              padding: "0.5rem",
              border: `1px solid ${colors.mainColor}`,
              borderRadius: "0.5rem",
              zIndex: 20,
              backgroundColor: colors.white,
              width: "12rem",
            }}
          >
            {(["name", "date"] as const).map((c) => (
              <p
                key={c}
                style={{ margin: 0, cursor: "pointer" }}
                onClick={() => onChooseCriterion(c)}
              >
                {c === "name" ? "Nome" : "Recentes"}{" "}
                {criterion === c &&
                  (direction === "asc" ? (
                    <FontAwesomeIcon icon={faCircleArrowUp} />
                  ) : (
                    <FontAwesomeIcon icon={faCircleArrowDown} />
                  ))}
              </p>
            ))}
          </div>
        )}
      </div>
    );
  }
);

/* ----------------------------- Header ------------------------------ */
interface HeaderProps {
  mobile?: boolean;
  title: React.ReactNode;
  titleText: string;
  inputValue: string;
  setInputValue: (v: string) => void;
  showSort: boolean;
  toggleSort: () => void;
  criterion: "name" | "date";
  direction: "asc" | "desc";
  onChooseCriterion: (criterion: "name" | "date") => void;
}

export const Header: React.FC<HeaderProps> = React.memo(
  ({
    mobile = false,
    title,
    titleText,
    inputValue,
    setInputValue,
    showSort,
    toggleSort,
    criterion,
    direction,
    onChooseCriterion,
  }) => {
    const Wrapper = mobile ? SearchHeaderMobile : SearchHeader;
    return (
      <Wrapper>
        {title}
        <SearchBarContainer>
          <div style={{ width: "98%" }}>
            <SearchBar
              placeHolder={
                mobile ? `Busque ${titleText}` : `Busque por ${titleText}`
              }
              showButtons={false}
              inputValue={inputValue}
              setInputValue={setInputValue}
            />
          </div>
          <SortControl
            show={showSort}
            toggle={toggleSort}
            criterion={criterion}
            direction={direction}
            onChooseCriterion={onChooseCriterion}
          />
        </SearchBarContainer>
      </Wrapper>
    );
  }
);

/* --------------------------- SearchPage --------------------------- */
const SearchPage: React.FC = () => {
  /* ------------------------------ route/query ------------------------------ */
  const { selected = "" } = useParams<{ selected: string }>();
  const query = useMemo(() => {
    return new URLSearchParams(useLocation().search).get("search") || "";
  }, []);

  /* ------------------------------- state ---------------------------------- */
  const [dataPaintings, setDataPaintings] = useState<any[]>([]);
  const [dataChurches, setDataChurches] = useState<any[]>([]);
  const [dataTags, setDataTags] = useState<any[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [inputValue, setInputValue] = useState(query);
  const [isLoading, setIsLoading] = useState(false);

  const isMobile = useIsMobile();

  /* sort controls */
  const [criterion, setCriterion] = useState<"name" | "date">("name");
  const [direction, setDirection] = useState<"asc" | "desc">("asc");
  const [showSort, setShowSort] = useState(false);
  const toggleSort = useCallback(() => setShowSort((p) => !p), []);

  /* ------------------------------ fetch data ------------------------------ */
  const translatedSelected = translateSelected(selected);

  useEffect(() => {
    const fetchData = async () => {
      if (!translatedSelected) return;
      const needsFetch =
        (translatedSelected === "churches" && dataChurches.length === 0) ||
        (translatedSelected === "paintings" && dataPaintings.length === 0) ||
        (translatedSelected === "tags" && dataTags.length === 0);
      if (!needsFetch) return;

      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/${translatedSelected}`
        );
        if (translatedSelected === "churches") setDataChurches(response.data);
        if (translatedSelected === "paintings") setDataPaintings(response.data);
        if (translatedSelected === "tags") setDataTags(response.data);
      } catch (err: any) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [translatedSelected]);

  /* ------------------------------- filtering ------------------------------ */
  const datasetMap = useMemo(() => {
    return {
      obras: dataPaintings,
      artifices: dataPaintings,
      igrejas: dataChurches,
      topicos: dataTags,
    } as const;
  }, [dataPaintings, dataChurches, dataTags]);

  const filtered = useMemo(() => {
    const base = datasetMap[selected as keyof typeof datasetMap] || [];
    return base.filter((it: any) => {
      const textMatch =
        normalize(it.title).includes(normalize(inputValue)) ||
        normalize(it.name).includes(normalize(inputValue));
      const tagMatch = it.tags?.some((t: any) =>
        normalize(t.name).includes(normalize(inputValue))
      );
      return textMatch || tagMatch;
    });
  }, [datasetMap, selected, inputValue]);

  /* ------------------------------- sorting -------------------------------- */
  const sorted = useMemo(
    () => sortArray(filtered, criterion, direction),
    [filtered, criterion, direction]
  );

  const chooseCriterion = (c: "name" | "date") => {
    if (criterion === c) {
      setDirection((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setCriterion(c);
      setDirection("asc");
    }
  };

  /* ------------------------------ render list ----------------------------- */
  const Spinner = (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: 20,
      }}
    >
      <CircularProgress style={{ color: colors.mainColor }} />
    </div>
  );

  const renderList = (
    data: any[],
    MobileResultComponent: React.ElementType,
    ResultComponent: React.ElementType
  ) =>
    isLoading
      ? Spinner
      : data.length
      ? data.map((item: any, idx: number) =>
          isMobile ? (
            <MobileResultComponent key={item.id || idx}>
              <Item
                item={item}
                type={translateTopicType(selected)}
                fixedImgHeight
              />
            </MobileResultComponent>
          ) : (
            <ResultComponent key={item.id || idx}>
              <Item
                item={item}
                type={translateTopicType(selected)}
                fixedImgHeight
              />
            </ResultComponent>
          )
        )
      : error && <p>Nenhum item encontrado na busca...</p>;

  const ResultMobile = isMobile ? SearchResultMobile : SearchResult;

  /* ----------------------------- content render --------------------------- */
  const commonHeader = (
    <Header
      mobile={isMobile}
      titleText={selected}
      title={
        selected === "obras" ? (
          <>
            Nossa Coleção de{" "}
            <span style={{ color: colors.mainColor }}>
              {capitalize(selected)}
            </span>
          </>
        ) : (
          <>
            Todas as{" "}
            <span style={{ color: colors.mainColor }}>
              {capitalize(selected)}
            </span>
          </>
        )
      }
      inputValue={inputValue}
      setInputValue={setInputValue}
      showSort={showSort}
      toggleSort={toggleSort}
      criterion={criterion}
      direction={direction}
      onChooseCriterion={chooseCriterion}
    />
  );

  const body = (() => {
    switch (selected) {
      case "artifices":
      case "obras":
        return (
          <>
            {commonHeader}
            <SearchResultsContainer>
              {renderList(sorted, ResultMobile, ResultMobile)}
            </SearchResultsContainer>
          </>
        );
      case "igrejas":
        return (
          <>
            <ChurchMap isMobile={isMobile} />
            {commonHeader}
            <SearchResultsContainer>
              {renderList(sorted, ResultMobile, ResultMobile)}
            </SearchResultsContainer>
          </>
        );
      case "topicos":
        return (
          <TopicSearch
            isLoading={isLoading}
            tags={sorted}
            isMobile={isMobile}
          />
        );
      default:
        return <p>Selecione uma categoria válida.</p>;
    }
  })();

  /* -------------------------------- return -------------------------------- */
  return isMobile ? (
    <SearchContainerMobile>{body}</SearchContainerMobile>
  ) : (
    <SearchContainer>{body}</SearchContainer>
  );
};

export default SearchPage;
